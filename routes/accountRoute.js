/* Account routes  week 4
   Deliver login view */
//Needed Resources
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const utilities = require('../utilities');

// Deliver login view activity
router.get('/login', utilities.handleErrors(accountController.buildLogin));

module.exports = router;