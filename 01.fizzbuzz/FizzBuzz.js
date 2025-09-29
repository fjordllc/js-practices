for (let cnt = 1; cnt <= 20; cnt++) {
    if( cnt % 3 === 0) {
        console.log("Fizz");
    }
    if (cnt % 5 === 0) {
        console.log("Buzz");
    }
    if (cnt % 3 == 0 && cnt % 5 == 0) {
        console.log("FizzBuzz");
    }
    else {
        console.log(cnt);
    }
}