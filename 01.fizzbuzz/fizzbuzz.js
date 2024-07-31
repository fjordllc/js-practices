#!/user/bin/env node

for(let i =1; i <= 20; i++) {
  if( i % 3 === 0 && i % 5=== 0) {
    console.log("FizzBuzz");
  } elsif (i % 3 === 0) {
    console.log("Fizz");
  } elsif (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}
