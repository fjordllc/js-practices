// 1~20までの数を書き出す
for (let step = 1; step <= 20; step++) {
  // 3で割り切れる数の場合はFizzと表示
  if (step % 3 === 0) {
    console.log("Fizz");
  } else if (step % 5 === 0) {
    // 5で割り切れる数の場合はBuzzと表示
    console.log("Buzz");
  } else {
    // それ以外の数はそのまま表示
    console.log(step);
  }
}
