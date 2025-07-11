for (let number = 1; number <= 20; number++) {
  let output = "";
  if (number % 3 === 0 && number % 5 === 0) {
    output = "FizzBuzz";
  } else if (number % 3 === 0) {
    output = "Fizz";
  } else if (number % 5 === 0) {
    output = "Buzz";
  } else {
    output = number;
  }
  console.log(JSON.stringify(output));
}
