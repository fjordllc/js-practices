let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

for (let i = 0; i < 20; i ++) {
  if (numbers[i] % 15 === 0) {
    console.log('FizzBuzz');
  } else if (numbers[i] % 3 === 0) {
    console.log('Fizz');
  } else if (numbers[i] % 5 === 0) {
    console.log('Buzz');
  } else {
    console.log(numbers[i]);
  }
};
