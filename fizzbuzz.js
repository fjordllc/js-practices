#!/usr/bin/env bash

const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
arr.forEach((number) => {
  if (number % 3 === 0 && number % 5 === 0) {
    console.log("FizzBuzz"); 
    } else if (number % 3 === 0) {
    console.log("Fizz");
    } else if (number % 5 === 0) {
    console.log("Buzz");
    } else {
    console.log(number);
    }
});

// test
