[...Array(20).keys()]
  .map((i) => ++i)
  .forEach((currentValue) => {
    switch (0) {
      case currentValue % (3 * 5):
        console.log("FizzBuzz");
        break;

      case currentValue % 3:
        console.log("Fizz");
        break;
      case currentValue % 5:
        console.log("Buzz");
        break;
      default:
        console.log(currentValue);
        break;
    }
  });
