const regValidate = require('../utilities/account-validation');
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const utilities = require('../utilities');

// Deliver Account Management view
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement));
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

// Logout route
router.get('/logout',
  utilities.checkLogin, 
  utilities.handleErrors(accountController.logoutAccount));

// Route to deliver update view
router.get('/update', 
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildUpdate));

// Route to handle account update
router.post('/update', 
  utilities.checkLogin, 
  regValidate.updateAccountRules(), 
  regValidate.checkUpdateData, 
  utilities.handleErrors(accountController.updateAccount));

// Route to handle password change
router.post('/change-password', 
  utilities.checkLogin, 
  regValidate.changePasswordRules(), 
  regValidate.checkPasswordData, 
  utilities.handleErrors(accountController.changePassword));

module.exports = router;
