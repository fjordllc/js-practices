// import minimist from "minimist";

// const { m, y } = minimist(process.argv.slice(2));
// const input_date = new Date(y, m);
// console.log(input_date);
// const today = new Date();
const base_date = new Date();
const base_year = base_date.getFullYear();
const base_month = base_date.getMonth();
const display_month = base_month + 1;
const days = new Date(base_year, base_month + 1, 0).getDate();
const first_day = new Date(base_year, base_month, 1).getDay();
const weeks = new Array();
let week = "  " + "   ".repeat(first_day - 1);
for (let day = 1, weekday = first_day; day <= days; day++, weekday++) {
  let number_width = 3;
  if (weekday === 0) number_width = 2;
  week = week.concat(String(day).padStart(number_width));
  if (day === days || weekday === 6) {
    weeks.push(week);
    weekday = -1;
    week = "";
  }
}
const calender = weeks.join("\n");
const format_calender = [
  `       ${display_month}月 ${base_year}`,
  "日 月 火 水 木 金 土",
  `${calender}`,
].join("\n");

console.log(format_calender);

// 擬似Rangeを作る方法（今回は使用しないかも）
// const get_days = (start, end) => [...Array(end + 1).keys()].slice(start);
