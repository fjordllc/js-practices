for (let fizzbuzz = 1; fizzbuzz <= 20; fizzbuzz++) {
  if (fizzbuzz % 15 === 0) {
    console.log("Fizzbuzz");
  } else if (fizzbuzz % 3 === 0) {
    console.log("Fizz");
  } else if (fizzbuzz % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(fizzbuzz);
  }
}
