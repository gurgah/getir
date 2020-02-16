const validator = require("../validate.js");

describe("Validate invalid date", () => {
  test("it should return false for an invalid date", () => {
    const input = "invalid date";
    const output = false;
    expect(validator.validateDate(input)).toEqual(output);
  });
});

describe("Validate invalid date formats", () => {
  test("it should return false for a different date format than YYYY-MM-DD", () => {
    const invalidFormatSlash = "2020/02/12";
    const invalidFormatMisplaced = "02-12-2020";
    const invalidFormatSingleDigit = "2020-2-12";
    const output = false;

    expect(validator.validateDate(invalidFormatSlash)).toEqual(output);
    expect(validator.validateDate(invalidFormatMisplaced)).toEqual(output);
    expect(validator.validateDate(invalidFormatSingleDigit)).toEqual(output);

  });
});

describe("Validate date", () => {
  test("it should return true for a valid date with format YYYY-MM-DD", () => {
    const inputValidOne = "1998-12-31";
    const inputValidTwo = "2020-02-10";
    const inputValidThree = "2000-01-01";
    const output = true;

    expect(validator.validateDate(inputValidOne)).toEqual(output);
    expect(validator.validateDate(inputValidTwo)).toEqual(output);
    expect(validator.validateDate(inputValidThree)).toEqual(output);

  });
});

describe("Validate number", () => {
  test("it should return true for a number", () => {
    const input = 123;
    const output = true;
    expect(validator.validateNumber(input)).toEqual(output);

  });
});

describe("Validate non-number", () => {
  test("it should return false for a not number", () => {
    const input = "aaa";
    const output = false;
    expect(validator.validateNumber(input)).toEqual(output);

  });
});

