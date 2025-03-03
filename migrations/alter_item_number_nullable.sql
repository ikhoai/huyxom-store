-- Migration script to make the number column nullable
-- To be executed on production before deploying code changes

-- Alter the items table to make number column nullable
ALTER TABLE items ALTER COLUMN number DROP NOT NULL;

-- Verify the change
SELECT column_name, is_nullable, data_type 
FROM information_schema.columns 
WHERE table_name = 'items' AND column_name = 'number'; 