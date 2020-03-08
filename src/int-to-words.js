const { UNITS, TENS, SCALES } = require('./number-words');

function intToWords(input) {
  // Regex to remove leading zeros and exclude non numeric chars
  const VALID_PATTERN = /^(0*)([0-9]+)$/;
  const match = input
    .trim()
    .match(VALID_PATTERN);

  // Check is a number
  if (match === null) {
    return 'NaN';
  }

  const significantDigits = match[2];

  // Check for zero
  if (significantDigits === '0') {
    return 'zero';
  }

  // Split input into 3 digit chunks, corresponding to SCALES, from right to left.
  // Left pad where necessary.
  // This means we'll be processing chunks from least significant to most significant.

  const CHUNK_LENGTH = 3;
  let start = significantDigits.length;
  const chunks = [];
  while (start > 0) {
    const end = start;
    start = Math.max(0, start - CHUNK_LENGTH);
    const rawChunk = significantDigits.slice(start, end);
    chunks.push(rawChunk.padStart(CHUNK_LENGTH, '0'));
  }

  // Check if we have enough scale words to describe the input
  const chunksLen = chunks.length;
  if (chunksLen > SCALES.length) {
    return 'Out of range';
  }

  // Wordify each integer in each chunk
  const words = [];
  chunks.forEach((chunk, chunkIndex) => {
    const ALL_ZERO_PATTERN = /^0+$/;
    // Only process chunks with non zero components
    if (chunk.match(ALL_ZERO_PATTERN) === null) {
      // Split chunk into digits
      const digits = chunk
        .split('')
        .map((char) => parseInt(char, 10));

      const UNITS_INDEX = 2;
      const TENS_INDEX = 1;
      const HUNDREDS_INDEX = 0;

      // If tens integer is 1, i.e. 10, then add 10 to units integer
      if (digits[TENS_INDEX] === 1) {
        digits[UNITS_INDEX] += 10;
      }

      // Attempt word lookups
      const unitWord = UNITS[digits[UNITS_INDEX]];
      const tensWord = TENS[digits[TENS_INDEX]];
      const hundredsWord = UNITS[digits[HUNDREDS_INDEX]];
      const scaleWord = SCALES[chunkIndex];

      // Push found words onto words array, in reverse order
      if (scaleWord !== '') {
        words.push(scaleWord);
      }

      if (unitWord !== '') {
        words.push(unitWord);
      }

      if (tensWord !== '') {
        words.push(tensWord);
      }

      // Add 'and' string where we have a units or tens word, if...
      if (unitWord !== '' || tensWord !== '') {
        // chunk has a hundreds word, or more chunks to follow
        if (hundredsWord !== '' || chunkIndex < (chunksLen - 1)) {
          words.push('and');
        }
      }

      if (hundredsWord !== '') {
        words.push(`${hundredsWord} hundred`);
      }
    }
  });

  return words.reverse().join(' ');
}

module.exports = intToWords;
