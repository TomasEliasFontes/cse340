const express = require('express');
const router = express.Router();
const utilities = require('../utilities');

router.get('/trigger-error', utilities.handleErrors(async (req, res, next) => {
  const error = new Error('This is an intentional error for testing purposes');
  error.status = 500;
  throw error;
}));

module.exports = router;
