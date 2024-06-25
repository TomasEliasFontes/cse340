-- 1. Insert a new record
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');


-- 2. Modify the Tony Stark record
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';


-- 3. Delete the Tony Stark record
DELETE FROM account
WHERE account_email = 'tony@starkent.com';


-- 4. Modify the "GM Hummer" record
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';


-- 5. Inner join to select make and model
SELECT inventory.inv_make, inventory.inv_model, classification.classification_name
FROM inventory
INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification.classification_name = 'Sport';


-- 6. Update file paths
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');