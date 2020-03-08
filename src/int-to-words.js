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

  // Split input into 3 digit chunks, corresponding to SCALES, from right to left. Left pad where necessary.
  // This means we'll be processing chunks from least significant to most significant.

  const CHUNK_LENGTH = 3;
  let start = significantDigits.length;
  const chunks = [];
  while (start > 0) {
    const end = start;
    start = Math.max(0, start - CHUNK_LENGTH);
    const rawChunk = significantDigits.slice(start, end);
    chunks.push(rawChunk.padStart(CHUNK_LENGTH - rawChunk.length, '0'));
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
      // Split chunk into digits, ordering from least significant to most significant
      const digits = chunk
        .split('')
        .reverse()
        .map((char) => parseInt(char, 10));

      // If tens integer is 1, i.e. 10, then add 10 to units integer
      if (digits[1] === 1) {
        digits[0] += 10;
      }

      // Attempt scale word lookup
      const scaleWord = SCALES[chunkIndex];
      if (scaleWord !== '') {
        words.push(scaleWord);
      }

      // Attempt unit word lookup
      const unitWord = UNITS[digits[0]];
      if (unitWord !== '') {
        words.push(unitWord);
      }

      // Attempt tens word lookup
      const tensWord = TENS[digits[1]];
      if (tensWord !== '') {
        words.push(tensWord);
      }

      // Add 'and' string where we have a units amount, if...
      if (digits[0] > 0 || digits[1] > 0) {
        // Chunk has a hundreds integer, or more chunks to follow
        if (digits[2] > 0 || (chunkIndex + 1) < chunksLen) {
          words.push('and');
        }
      }

      // Add hundreds word if array item exists
      if (UNITS[digits[2]]) {
        words.push(`${UNITS[digits[2]]} hundred`);
      }
    }
  });

  return words.reverse().join(' ');
}

module.exports = intToWords;
