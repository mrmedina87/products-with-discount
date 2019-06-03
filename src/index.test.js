const { getPrice } = require('./index');

const test1Input = 'VOUCHER, TSHIRT, MUG';
const test1Benchmark = 32.5;

const test2Input = 'VOUCHER, TSHIRT, VOUCHER';
const test2Benchmark = 25;

const test3Input = 'TSHIRT, TSHIRT, TSHIRT, VOUCHER, TSHIRT';
const test3Benchmark = 81;

const test4Input = 'VOUCHER, TSHIRT, VOUCHER, VOUCHER, MUG, TSHIRT, TSHIRT';
const test4Benchmark = 74.5;

const test5Input = 'Mariano, Medina';
const test5Benchmark = 0;

const test6Input = 'CAP, CAP, CAP, CAP';
const test6Benchmark = 12;

const test7Input = 12;
const test7Benchmark = 'Wrong Input';

test('Should ignore discounts', () => {
  expect(getPrice(test1Input)).toBe(test1Benchmark);
});

test('Should use only 2x1 discount', () => {
  expect(getPrice(test2Input)).toBe(test2Benchmark);
});

test('Should use only Bulk discount', () => {
  expect(getPrice(test3Input)).toBe(test3Benchmark);
});

test('Should use both', () => {
  expect(getPrice(test4Input)).toBe(test4Benchmark);
});

test('Should be cero, because those products do not exist', () => {
  expect(getPrice(test5Input)).toBe(test5Benchmark);
});

test('Should accumulate discounts for a product', () => {
  expect(getPrice(test6Input)).toBe(test6Benchmark);
});

test('Should handle unexpected number as an input with an error message as output', () => {
  expect(getPrice(test7Input)).toBe(test7Benchmark);
});
