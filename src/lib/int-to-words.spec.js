const { intToWords, errorCases } = require('./int-to-words');

describe('intToWords business logic', () => {
  test('"" to throw "NaN"', () => {
    expect(() => intToWords('')).toThrow(errorCases.NaN);
  });

  test('"qwerty" to throw "NaN"', () => {
    expect(() => intToWords('qwerty')).toThrow(errorCases.NaN);
  });

  test('"1 2" to throw "NaN"', () => {
    expect(() => intToWords('1 2')).toThrow(errorCases.NaN);
  });

  test('"0x2" to throw "NaN"', () => {
    expect(() => intToWords('0x2')).toThrow(errorCases.NaN);
  });

  test('"0" to return "zero"', () => {
    expect(intToWords('0')).toBe('zero');
  });

  test('"0000" to return "zero"', () => {
    expect(intToWords('0000')).toBe('zero');
  });

  test('"1" to return "one"', () => {
    expect(intToWords('1')).toBe('one');
  });

  test('" 1 " to return "one"', () => {
    expect(intToWords(' 1 ')).toBe('one');
  });

  test('"0001" to return "one"', () => {
    expect(intToWords('0001')).toBe('one');
  });

  test('"23" to return "twenty three"', () => {
    expect(intToWords('23')).toBe('twenty three');
  });

  test('"100" to return "one hundred"', () => {
    expect(intToWords('100')).toBe('one hundred');
  });

  test('"120" to return "one hundred and twenty"', () => {
    expect(intToWords('120')).toBe('one hundred and twenty');
  });

  test('"4678" to return "four thousand six hundred and seventy eight"', () => {
    expect(intToWords('4678')).toBe('four thousand six hundred and seventy eight');
  });

  test('"10000" to return "ten thousand"', () => {
    expect(intToWords('10000')).toBe('ten thousand');
  });

  test('"1000001" to return "one million and one"', () => {
    expect(intToWords('1000001')).toBe('one million and one');
  });

  test('"1100001" to return "one million one hundred thousand and one"', () => {
    expect(intToWords('1100001')).toBe('one million one hundred thousand and one');
  });

  test('"1121001" to return "one million one hundred and twenty one thousand and one"', () => {
    expect(intToWords('1121001')).toBe('one million one hundred and twenty one thousand and one');
  });

  test('"1000000000000000000000" to throw "Out of range"', () => {
    expect(() => intToWords('1000000000000000000000')).toThrow(errorCases.outOfRange);
  });
});
