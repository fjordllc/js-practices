// import minimist from "minimist";

// const { m, y } = minimist(process.argv.slice(2));
// const input_date = new Date(y, m);
// console.log(input_date);

const base_date = new Date();
const base_year = base_date.getFullYear();
const base_month = base_date.getMonth() + 1;
const first_date = new Date(base_date.getFullYear(), base_date.getMonth(), 1);
const last_date = new Date(
  base_date.getFullYear(),
  base_date.getMonth() + 1,
  0,
);
const days = last_date.getDate();
const first_day = first_date.getDay();
let weekday = first_day;
let line = "   ".repeat(first_day);
let cal = new Array();
for (let day = 1; day <= days; day++) {
  line = line + String(day).padStart(3);
  if (day === days || weekday === 6) {
    weekday = 0;
    cal.push(line);
    line = "";
    continue;
  }
  weekday += 1;
}
const text = cal.join("\n");
console.log(`       ${base_month}月 ${base_year}`);
console.log(" 日 月 火 水 木 金 土");
console.log(text, "\n");
console.log(base_date);
console.log(base_date.toString());
console.log(first_date.toString());
console.log(last_date.toString());
console.log(base_month);
// 擬似Rangeを作る方法（今回は使用しないかも）
// const get_days = (start, end) => [...Array(end + 1).keys()].slice(start);
