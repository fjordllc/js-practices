/*
1から20までの数をプリントするプログラムを書け。
ただし3の倍数のときは数の代わりに｢Fizz｣と、
5の倍数のときは｢Buzz｣とプリントし、
3と5両方の倍数の場合には｢FizzBuzz｣とプリントすること
*/
for (let i = 1; i < 21; i++){
    if (i % 3 === 0 && i % 5 === 0){
        console.log('FizzBuzz');
    } else if (i % 3 === 0){
        console.log('Fizz');
    } else if (i % 5 === 0){
        console.log('Buzz');
    } else {
        console.log(`${i}`);
    }
}
