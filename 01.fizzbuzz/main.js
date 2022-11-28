let num = 1;
while (num < 16) {
  if (num % 5 === 0 && num % 3 === 0) {
    console.log("fizzbuzz");
  } else if (num % 5 === 0) {
    console.log("buzz");
  } else if (num % 3 === 0) {
    console.log("fizz");
  } else {
    console.log(num);
  }
  num += 1;
}
