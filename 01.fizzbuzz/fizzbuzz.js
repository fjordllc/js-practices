const calculate_fizzbuzz = (num) => {
    if (num % 5 == 0 && num % 3 == 0) {
      return "FizzBuzz";
    } else if (num % 5 == 0) {
      return "Buzz";
    } else if (num % 3 == 0) {
      return "Fizz";
    } else {
      return num;
    }
  };
  
  for (let num = 1; num <= 20; num++) {
    console.log(calculate_fizzbuzz(num));
  }
