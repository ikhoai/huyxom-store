# Database Schema for Huyxom Store

This document describes the database schema for the Huyxom Store Management System.

## Item Table

| Column       | Type             | Description                            | Constraints        |
|--------------|------------------|----------------------------------------|--------------------|
| id           | UUID             | Unique identifier for the item         | PRIMARY KEY        |
| number       | VARCHAR          | Reference number for the item          | NOT NULL, UNIQUE   |
| userid       | VARCHAR          | ID of the user who owns the item       | NOT NULL           |
| name         | VARCHAR          | Name of the item                       | NOT NULL           |
| type         | VARCHAR          | Category/type of the item              | NULL               |
| notes        | TEXT             | Additional notes about the item        | NULL               |
| picture      | VARCHAR          | URL to the item's image                | NULL               |
| phone        | VARCHAR          | Contact phone number                   | NULL               |
| price        | DECIMAL(10,2)    | Price of the item in USD               | NOT NULL, DEFAULT 0|
| sold         | BOOLEAN          | Whether the item is sold               | NOT NULL, DEFAULT false|
| paid         | BOOLEAN          | Whether payment is received            | NOT NULL, DEFAULT false|
| createdAt    | TIMESTAMP        | When the record was created            | NOT NULL           |
| updatedAt    | TIMESTAMP        | When the record was last updated       | NOT NULL           |

### SQL Schema

```sql
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    number VARCHAR NOT NULL UNIQUE,
    userid VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    type VARCHAR,
    notes TEXT,
    picture VARCHAR,
    phone VARCHAR,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    sold BOOLEAN NOT NULL DEFAULT false,
    paid BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Index for faster search by user ID
CREATE INDEX idx_items_userid ON items(userid);

-- Index for faster search by phone number
CREATE INDEX idx_items_phone ON items(phone);

-- Composite index for items that are sold and paid
CREATE INDEX idx_items_sold_paid ON items(sold, paid);
```

## Sequelize Model

The database schema is implemented using Sequelize, a Node.js ORM:

```javascript
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    sold: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: true,
    tableName: 'items'
  });

  return Item;
};
```

## Future Schema Extensions

For future development, the following tables might be added:

### Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    role VARCHAR NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);
```

### Categories Table

```sql
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL UNIQUE,
    description TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Add foreign key to items table
ALTER TABLE items ADD COLUMN category_id UUID;
ALTER TABLE items ADD CONSTRAINT fk_items_category FOREIGN KEY (category_id) REFERENCES categories(id);
```

### Transactions Table

```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    type VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    notes TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT fk_transactions_item FOREIGN KEY (item_id) REFERENCES items(id)
);
``` 