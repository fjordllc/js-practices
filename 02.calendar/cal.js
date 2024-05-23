import minimist from "minimist";
const today = new Date();
const { m, y } = minimist(process.argv.slice(2));
const month = m ? m - 1 : today.getMonth();
const year = y ? y : today.getFullYear();
const display_month = month + 1;
const first_day = new Date(year, month, 1).getDay();
const last_date = new Date(year, month + 1, 0).getDate();
const weeks = new Array();
let first_week = "";
if (first_day !== 0) {
  const padding = "  " + "   ".repeat(first_day - 1);
  first_week = first_week.concat(padding);
}
let week = first_week;
for (let day = 1, weekday = first_day; day <= last_date; day++, weekday++) {
  let number_width = 3;
  if (weekday === 0) number_width = 2;
  week = week.concat(String(day).padStart(number_width));
  if (day === last_date || weekday === 6) {
    weeks.push(week);
    weekday = -1;
    week = "";
  }
}

const calender = weeks.join("\n");
const format_calender = [
  `       ${display_month}月 ${year}`,
  "日 月 火 水 木 金 土",
  `${calender}`,
].join("\n");

console.log(format_calender);
