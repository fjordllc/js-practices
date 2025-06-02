#!/usr/bin/env node

let count = 0
while (count < 20) {
    count++
    if(count % 15 == 0)
        console.log("FizzBuzz");
    else if (count % 3 == 0) {
        console.log("Fizz");
    } 
    else if (count % 5 == 0){
        console.log("Buzz");
    }
    else {
        console.log(count);
    }
}
