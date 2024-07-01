const express = require('express');
const router = express.Router();
const Util = require('../utilities/index');

router.get('/trigger-error', Util.handleErrors(async (req, res, next) => {
  throw new Error('This is an intentional error for testing purposes');
}));

module.exports = router;
