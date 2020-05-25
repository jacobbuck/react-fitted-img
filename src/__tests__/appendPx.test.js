import appendPx from '../appendPx';

test('appends px to numbers', () => {
  expect(appendPx(0)).toBe('0px');
  expect(appendPx(10)).toBe('10px');
  expect(appendPx(10.01)).toBe('10.01px');
  expect(appendPx(-10)).toBe('-10px');
});

test('appends px to numerical strings', () => {
  expect(appendPx('0')).toBe('0px');
  expect(appendPx('10')).toBe('10px');
  expect(appendPx('10.01')).toBe('10.01px');
  expect(appendPx('-10')).toBe('-10px');
});

test('returns non-numerical strings', () => {
  expect(appendPx('')).toBe('');
  expect(appendPx('10px')).toBe('10px');
  expect(appendPx('10.01%')).toBe('10.01%');
  expect(appendPx('hello')).toBe('hello');
});

test('returns invalid values', () => {
  expect(appendPx(null)).toBeNull();
  expect(appendPx(undefined)).toBeUndefined();
  const obj = {};
  expect(appendPx(obj)).toBe(obj);
  const arr = [];
  expect(appendPx(arr)).toBe(arr);
});
