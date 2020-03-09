const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const { intToWords, errorCases } = require('../lib/int-to-words');

/* GET words handler. */
router.get('/:int', (req, res, next) => {
  const { int } = req.params;
  // Convert to words
  const result = intToWords(int);
  // Check for error cases
  const errorValues = Object.values(errorCases);
  if (errorValues.includes(result)) {
    next(createError(422, result));
    return;
  }
  // Send response
  res.status(200);
  res.send(result);
});

module.exports = router;
