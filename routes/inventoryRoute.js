const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const { body } = require('express-validator');

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory item detail view
router.get("/detail/:inventoryId", invController.buildByInventoryId);

// Route to build Management View
router.get('/management', invController.buildManagement);

// Route to build Add classification 
router.get('/add-classification', invController.buildAddClassification);
router.post('/add-classification',
  body('classification_name').trim().isLength({ min: 1 }).withMessage('Please provide a classification name.').isAlphanumeric().withMessage('No spaces or special characters.'),
  invController.addClassification
);

// Route to build Add inventory
router.post('/add-inventory', [
  body('inv_make').trim().isLength({ min: 1 }).withMessage('Please provide the make.'),
  body('inv_model').trim().isLength({ min: 1 }).withMessage('Please provide the model.'),
  body('inv_year').trim().isInt({ min: 1900, max: 2100 }).withMessage('Please provide a valid year between 1900 and 2100.'),
  body('inv_image').trim().isLength({ min: 1 }).withMessage('Please provide the image path.'),
  body('inv_thumbnail').trim().isLength({ min: 1 }).withMessage('Please provide the thumbnail path.'),
  body('inv_price').trim().isFloat({ min: 0 }).withMessage('Please provide a valid price.'),
  body('inv_miles').trim().isInt({ min: 0 }).withMessage('Please provide a valid mileage.'),
  body('inv_color').trim().isLength({ min: 1 }).withMessage('Please provide the color.'),
  body('classification_id').isInt().withMessage('Please select a classification.'),
], invController.addInventory);

module.exports = router;