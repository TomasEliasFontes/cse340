const regValidate = require('../utilities/account-validation');
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const utilities = require('../utilities');

// Deliver login view activity
router.get('/login', utilities.handleErrors(accountController.buildLogin));

// Deliver registration view activity
router.get('/register', utilities.handleErrors(accountController.buildRegister));

// Post the register 
router.post(
  '/register',
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

module.exports = router;
