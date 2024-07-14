const regValidate = require('../utilities/account-validation');
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const utilities = require('../utilities');

// Deliver Account Management view
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

// Deliver login view activity
router.get('/login', utilities.handleErrors(accountController.buildLogin));

// Deliver registration view activity
router.get('/register', utilities.handleErrors(accountController.buildRegister));

// Process the login request
router.post(
  '/login',
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

// Post the register 
router.post(
  '/register',
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);


module.exports = router;
