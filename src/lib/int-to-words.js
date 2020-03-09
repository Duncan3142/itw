const { UNITS, TENS, SCALES } = require('./number-words');

// Define error cases
const ERROR_OUT_OF_RANGE = 'Out of range';
const ERROR_NAN = 'NaN';
const errorCases = { NaN: ERROR_NAN, outOfRange: ERROR_OUT_OF_RANGE };

// Cut input into 3 digit chunks, corresponding to SCALES, from right to left
// Left pad where necessary
// This means we'll be processing chunks from least significant digits to most significant digits

const CHUNK_LENGTH = 3;

function cutChunk(remainder) {
  return {
    value: remainder.slice(-CHUNK_LENGTH).padStart(CHUNK_LENGTH, '0'),
    remainder: remainder.substring(0, remainder.length - CHUNK_LENGTH),
  };
}

const UNITS_INDEX = 2;
const TENS_INDEX = 1;
const HUNDREDS_INDEX = 0;

function processChunk(chunk, chunkIndex, collector) {
  if (chunkIndex === SCALES.length) {
    // Insufficient scale words to describe input
    const result = [];
    result.push(ERROR_OUT_OF_RANGE);
    return result;
  }

  const { value, remainder } = chunk;

  // Only process chunks with non zero components
  if (value !== '000') {
    // Split chunk into digits
    const digits = value.split('').map((char) => parseInt(char, 10));

    // If tens integer is 1, i.e. 10, add 10 to units integer
    if (digits[TENS_INDEX] === 1) {
      digits[UNITS_INDEX] += 10;
    }

    // Attempt word lookups
    const unitsWord = UNITS[digits[UNITS_INDEX]];
    const tensWord = TENS[digits[TENS_INDEX]];
    const hundredsWord = UNITS[digits[HUNDREDS_INDEX]];
    const scaleWord = SCALES[chunkIndex];

    // Push found words onto words array, in reverse order
    if (scaleWord !== '') {
      collector.push(scaleWord);
    }

    if (unitsWord !== '') {
      collector.push(unitsWord);
    }

    if (tensWord !== '') {
      collector.push(tensWord);
    }

    // Add 'and' string where we have a units or tens word, if...
    if (unitsWord !== '' || tensWord !== '') {
      // chunk has a hundreds word, or more chunks to follow
      if (hundredsWord !== '' || remainder.length > 0) {
        collector.push('and');
      }
    }

    if (hundredsWord !== '') {
      collector.push(`${hundredsWord} hundred`);
    }
  }

  return remainder.length > 0
    ? processChunk(cutChunk(remainder), chunkIndex + 1, collector)
    : collector;
}

/**
 *
 * @param {string} input - Decimal string representation of positive integer
 * @returns {string} - English words representation of positive integer
 */
function intToWords(input) {
  // Regex to remove leading zeros and exclude non numeric chars
  const VALID_PATTERN = /^(0*)([0-9]+)$/;
  const match = input.trim().match(VALID_PATTERN);

  // Check is a number is valid format
  if (match === null) {
    return ERROR_NAN;
  }

  // Is valid number, discard leading zeros (if any)
  const significantDigits = match[2];

  // Check for zero value
  if (significantDigits === '0') {
    return 'zero';
  }

  // Wordify each scale chunk recursively
  const words = processChunk(cutChunk(significantDigits), 0, []);

  // Return result, correcting order
  return words.reverse().join(' ');
}

module.exports = { intToWords, errorCases };