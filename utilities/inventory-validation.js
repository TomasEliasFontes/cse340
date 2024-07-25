const { body, validationResult } = require('express-validator');
const utilities = require('../utilities');

function newInventoryRules() {
  return [
    body('inv_make')
      .notEmpty()
      .withMessage('Make is required')
      .isLength({ min: 2 })
      .withMessage('Make must be at least 2 characters long'),

    body('inv_model')
      .notEmpty()
      .withMessage('Model is required')
      .isLength({ min: 2 })
      .withMessage('Model must be at least 2 characters long'),

    body('inv_year')
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage(`Year must be between 1900 and ${new Date().getFullYear()}`),

    body('inv_description')
      .notEmpty()
      .withMessage('Description is required')
      .isLength({ min: 10 })
      .withMessage('Description must be at least 10 characters long'),

    body('inv_image')
      .notEmpty()
      .withMessage('Image path is required'),

    body('inv_thumbnail')
      .notEmpty()
      .withMessage('Thumbnail path is required'),

    body('inv_price')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),

    body('inv_miles')
      .isInt({ min: 0 })
      .withMessage('Miles must be a positive integer'),

    body('inv_color')
      .notEmpty()
      .withMessage('Color is required'),

    body('classification_id')
      .isInt()
      .withMessage('Classification is required')
  ];
}

async function checkUpdateData(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav();
    const classificationSelect = await utilities.buildClassificationList(req.body.classification_id);
    const itemName = `${req.body.inv_make} ${req.body.inv_model}`;
    res.status(422).render('inventory/edit-inventory', {
      title: 'Edit ' + itemName,
      nav,
      classificationSelect: classificationSelect,
      errors: errors.array(),
      ...req.body
    });
  } else {
    next();
  }
}

module.exports = {
  newInventoryRules,
  checkUpdateData,
};
