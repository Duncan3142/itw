const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const { intToWords } = require('../lib/int-to-words');

/* GET words handler. */
router.get('/:int', (req, res, next) => {
  const { int } = req.params;

  try {
    // Convert to words
    const result = intToWords(int);
    // Send response
    res.status(200);
    res.send(result);
  } catch (err) {
    // Handle invalid argument error
    next(createError(422, err));
  }
});

module.exports = router;
