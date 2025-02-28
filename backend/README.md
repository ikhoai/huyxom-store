# Huyxom Store Backend API

This is the backend API service for the Huyxom Store Management System. It provides RESTful API endpoints for managing store inventory and handling user searches.

## Technology Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **PostgreSQL**: Relational database
- **Sequelize**: ORM for database interaction
- **Docker**: Containerization

## API Endpoints

### Items API

| Method | Endpoint             | Description                             |
|--------|----------------------|-----------------------------------------|
| GET    | /api/items           | Get all items                           |
| GET    | /api/items/:id       | Get a specific item by ID               |
| POST   | /api/items           | Create a new item                       |
| PUT    | /api/items/:id       | Update an existing item                 |
| DELETE | /api/items/:id       | Delete an item                          |
| GET    | /api/items/search    | Search items by user ID or phone number |

## Development Setup

### Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:
```bash
git clone https://your-repository-url.git
cd huyxom-store/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on the `.env.example`:
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run dev
```

### Database Setup

1. Make sure PostgreSQL is running

2. Create the database:
```bash
createdb huyxom_store
```

3. Run the database migrations and seed:
```bash
npm run seed
```

## Running with Docker

You can also run the backend using Docker:

```bash
docker build -t huyxom-backend .
docker run -p 5000:5000 --env-file .env huyxom-backend
```

Or use Docker Compose to run the entire stack (backend, frontend, and database):

```bash
cd ..  # Go to the root project directory
docker-compose up -d
```

## API Documentation

### Get All Items

```
GET /api/items
```

Response:
```json
[
  {
    "id": "1",
    "number": "A001",
    "userid": "user123",
    "name": "Áo Khoác Da Vintage",
    "type": "Quần Áo",
    "notes": "Tình trạng tốt, hơi sờn ở cổ tay",
    "picture": "https://example.com/jacket.jpg",
    "phone": "0912345678",
    "price": 89.99,
    "sold": false,
    "paid": false,
    "createdAt": "2023-09-15T10:30:00.000Z",
    "updatedAt": "2023-09-15T10:30:00.000Z"
  },
  // ...more items
]
```

### Add Item

```
POST /api/items
```

Request body:
```json
{
  "number": "C001",
  "userid": "user789",
  "name": "Túi Xách Vintage",
  "type": "Phụ Kiện",
  "notes": "Tình trạng mới",
  "picture": "https://example.com/bag.jpg",
  "phone": "0956781234",
  "price": 59.99,
  "sold": false,
  "paid": false
}
```

Response:
```json
{
  "id": "4",
  "number": "C001",
  "userid": "user789",
  "name": "Túi Xách Vintage",
  "type": "Phụ Kiện",
  "notes": "Tình trạng mới",
  "picture": "https://example.com/bag.jpg",
  "phone": "0956781234",
  "price": 59.99,
  "sold": false,
  "paid": false,
  "createdAt": "2023-09-16T14:20:00.000Z",
  "updatedAt": "2023-09-16T14:20:00.000Z"
}
```

### Search Items

```
GET /api/items/search?searchTerm=user123
```

Response:
```json
[
  {
    "id": "1",
    "number": "A001",
    "userid": "user123",
    "name": "Áo Khoác Da Vintage",
    "type": "Quần Áo",
    "notes": "Tình trạng tốt, hơi sờn ở cổ tay",
    "picture": "https://example.com/jacket.jpg",
    "phone": "0912345678",
    "price": 89.99,
    "sold": false,
    "paid": false,
    "createdAt": "2023-09-15T10:30:00.000Z",
    "updatedAt": "2023-09-15T10:30:00.000Z"
  },
  // ...more items with userid "user123"
]
```

## Error Handling

The API uses appropriate HTTP status codes and returns error messages in the following format:

```json
{
  "message": "Item not found",
  "error": "Detailed error message in development mode only"
}
```

## Environment Variables

| Variable      | Description                       | Default Value       |
|---------------|-----------------------------------|---------------------|
| NODE_ENV      | Environment (development/production) | development    |
| PORT          | Port for the API server           | 5000                |
| DB_HOST       | Database host                     | localhost           |
| DB_PORT       | Database port                     | 5432                |
| DB_NAME       | Database name                     | huyxom_store        |
| DB_USER       | Database user                     | postgres            |
| DB_PASSWORD   | Database password                 | postgres123         |
| CORS_ORIGIN   | Allowed CORS origin               | http://localhost:3000 |
| JWT_SECRET    | Secret for JWT (future auth)      | huyxom_jwt_secret_key |

## License

This project is developed for internal use at Huyxom Store. 