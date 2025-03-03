# Database Migration Instructions

This directory contains database migration scripts that need to be applied to the production database before deploying application code changes.

## Current Migrations

### Make 'number' Column Nullable (2025-03-03)

**Migration File:** `alter_item_number_nullable.sql`

**Purpose:** This migration removes the NOT NULL constraint from the 'number' column in the 'items' table, allowing items to be created without specifying a number.

**Deployment Steps:**

1. **Apply Database Migration:**
   ```bash
   # Log into your production server
   ssh user@your-production-server
   
   # Navigate to your application directory
   cd /path/to/huyxom-store
   
   # Execute the migration script
   docker-compose exec db psql -U postgres -d huyxom_store -f /path/to/migrations/alter_item_number_nullable.sql
   ```

2. **Deploy Updated Application Code:**
   ```bash
   # Pull the latest code changes
   git pull
   
   # Rebuild and restart the application
   docker-compose down
   docker-compose build backend
   docker-compose up -d
   ```

3. **Verify the Changes:**
   ```bash
   # Check the database schema
   docker-compose exec db psql -U postgres -d huyxom_store -c "SELECT column_name, is_nullable, data_type FROM information_schema.columns WHERE table_name = 'items' AND column_name = 'number';"
   
   # Test creating an item without a number
   curl -X POST -H "Content-Type: application/json" -d '{"userid":"test123","name":"Test Item","type":"electronics","notes":"This is a test item","picture":"testpic.jpg","phone":"1234567890","price":99.99,"sold":false,"paid":false}' http://your-production-host/api/items
   ```

## Important Notes

1. **Always backup your database before running migrations in production**
2. **Test migrations in a staging environment first if possible**
3. **Schedule migrations during low-traffic periods**
4. **The `sequelize.sync({ alter: true })` option in server.js should be disabled in production after the migration** 