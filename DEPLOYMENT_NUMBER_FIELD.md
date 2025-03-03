# Deployment Guide: Making the 'number' Field Optional

This guide outlines the steps required to deploy the changes that make the 'number' field optional when creating items.

## Overview of Changes

1. **Model Change**: Updated `backend/models/item.js` to set `allowNull: true` for the number field
2. **Database Sync**: Modified `backend/server.js` to use `{ alter: true }` for development purposes
3. **SQL Migration**: Created a SQL script to safely alter the database table in production

## Deployment Process

### 1. Testing in Development/Staging

Before deploying to production, ensure the changes work as expected:

```bash
# Rebuild and restart the backend in development
docker-compose down
docker-compose build backend
docker-compose up -d

# Test creating an item without a number field
curl -X POST -H "Content-Type: application/json" -d '{"userid":"test123","name":"Test Item","type":"electronics","notes":"This is a test item","picture":"testpic.jpg","phone":"1234567890","price":99.99,"sold":false,"paid":false}' http://localhost/api/items
```

### 2. Production Deployment

#### Step 1: Backup Your Database

```bash
# SSH into your production server
ssh user@your-production-server

# Backup the database
docker-compose exec db pg_dump -U postgres -d huyxom_store > huyxom_store_backup_$(date +%Y-%m-%d).sql
```

#### Step 2: Apply Database Migration

```bash
# Create a directory for migrations if it doesn't exist
mkdir -p migrations

# Copy the migration script to the server
# (Or create it directly on the server)

# Execute the migration script
docker-compose exec db psql -U postgres -d huyxom_store -c "ALTER TABLE items ALTER COLUMN number DROP NOT NULL;"

# Verify the change
docker-compose exec db psql -U postgres -d huyxom_store -c "SELECT column_name, is_nullable, data_type FROM information_schema.columns WHERE table_name = 'items' AND column_name = 'number';"
```

#### Step 3: Deploy Code Changes

```bash
# Pull the latest changes
git pull

# Use the production version of server.js (without alter: true)
cp backend/server.js.production backend/server.js

# Rebuild and restart
docker-compose down
docker-compose build backend
docker-compose up -d
```

#### Step 4: Verify Deployment

```bash
# Check logs for any errors
docker-compose logs --tail=50 backend

# Test creating an item without a number field
curl -X POST -H "Content-Type: application/json" -d '{"userid":"test123","name":"Test Item","type":"electronics","notes":"This is a test item","picture":"testpic.jpg","phone":"1234567890","price":99.99,"sold":false,"paid":false}' http://your-production-host/api/items
```

## Rollback Plan

If issues are encountered during deployment, follow these steps to rollback:

### 1. Restore the Database

```bash
# Restore the database backup
cat huyxom_store_backup_YYYY-MM-DD.sql | docker-compose exec -T db psql -U postgres -d huyxom_store
```

### 2. Revert Code Changes

```bash
# Checkout the previous version
git checkout HEAD~1

# Rebuild and restart
docker-compose down
docker-compose build backend
docker-compose up -d
```

## Additional Notes

1. Keep `{ alter: true }` in development for easier schema changes, but never use it in production
2. Consider implementing a proper migration system (like Sequelize Migrations) for future database changes
3. Always test migrations and code changes in a staging environment before production deployment 