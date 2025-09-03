const fizzbuzz = require("./fizzbuzz-function");

test("3の倍数のときは、数の代わりにFizzと表示", () => {
  expect(fizzbuzz(3)).toBe("Fizz");
});

test("5の倍数のときは、数の代わりにBuzzと表示", () => {
  expect(fizzbuzz(5)).toBe("Buzz");
  expect(fizzbuzz(20)).toBe("Buzz");
});

test("15の倍数のときは、数の代わりにFizzBuzzと表示", () => {
  expect(fizzbuzz(15)).toBe("FizzBuzz");
});

test("それ以外は整数で表示", () => {
  expect(fizzbuzz(1)).toBe(1);
  expect(fizzbuzz(2)).toBe(2);
});
