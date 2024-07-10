const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");
const { validationResult } = require('express-validator');

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  if (data.length > 0) {
    const grid = await utilities.buildClassificationGrid(data);
    let nav = await utilities.getNav();
    const className = data[0].classification_name;
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    });
  } else {
    let nav = await utilities.getNav();
    res.render("./inventory/classification", {
      title: "No vehicles found",
      nav,
      grid: '<p class="notice">Sorry, no matching vehicles could be found.</p>',
    });
  }
}

/* ***************************
 * Build inventory item detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_id = req.params.inventoryId;
  const data = await invModel.getInventoryById(inventory_id);
  if (data.length > 0) {
    const vehicle = data[0];
    const viewData = await utilities.buildVehicleDetail(vehicle);
    let nav = await utilities.getNav();
    res.render("./inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      viewData,
    });
  } else {
    let nav = await utilities.getNav();
    res.render("./inventory/detail", {
      title: "Vehicle not found",
      nav,
      viewData: '<p class="notice">Sorry, this vehicle could not be found.</p>',
    });
  }
}

/* ***************************
 * Build Management View
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
  });
}

/* ***************************
 * Build Add Classification View
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  });
}

invCont.addClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: errors.array(),
    });
  }

  const { classification_name } = req.body;
  const result = await invModel.addClassification(classification_name);
  if (result) {
    req.flash('notice', 'Classification added successfully');
    res.redirect('/inv/management');
  } else {
    req.flash('notice', 'Failed to add classification');
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: [{ msg: 'Failed to add classification' }],
    });
  }
}

// Render the Add Inventory view
invCont.buildAddInventory = async function (req, res, next) {
  try {
    let nav = await utilities.getNav();
    let classificationList = await utilities.buildClassificationList();
    res.render('inventory/add-inventory', {
      title: 'Add Inventory',
      nav,
      classificationList,
      errors: null,
      inv_make: '',
      inv_model: '',
      inv_year: '',
      inv_image: '',
      inv_thumbnail: '',
      inv_price: '',
      inv_miles: '',
      inv_color: '',
      classification_id: ''
    });
  } catch (error) {
    next(error);
  }
};

// Handle adding inventory
invCont.addInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classificationList = await utilities.buildClassificationList();
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      errors: errors.array(),
      classificationList,
      inv_make: req.body.inv_make,
      inv_model: req.body.inv_model,
      inv_year: req.body.inv_year,
      inv_image: req.body.inv_image,
      inv_thumbnail: req.body.inv_thumbnail,
      inv_price: req.body.inv_price,
      inv_miles: req.body.inv_miles,
      inv_color: req.body.inv_color,
      classification_id: req.body.classification_id
    });
  }

  const { inv_make, inv_model, inv_year, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body;
  const result = await invModel.addInventory(inv_make, inv_model, inv_year, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id);
  
  if (result) {
    req.flash('notice', 'Inventory item added successfully');
    res.redirect('/inv/management');
  } else {
    req.flash('notice', 'Failed to add inventory item');
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      errors: [{ msg: 'Failed to add inventory item' }],
      classificationList,
      inv_make: req.body.inv_make,
      inv_model: req.body.inv_model,
      inv_year: req.body.inv_year,
      inv_image: req.body.inv_image,
      inv_thumbnail: req.body.inv_thumbnail,
      inv_price: req.body.inv_price,
      inv_miles: req.body.inv_miles,
      inv_color: req.body.inv_color,
      classification_id: req.body.classification_id
    });
  }
};

module.exports = invCont;