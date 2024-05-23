import minimist from "minimist";
const today = new Date();
const { m, y } = minimist(process.argv.slice(2));
const month = m ? m - 1 : today.getMonth();
const year = y ? y : today.getFullYear();
const displayMonth = month + 1;
const firstDay = new Date(year, month, 1).getDay();
const lastDate = new Date(year, month + 1, 0).getDate();
const weeks = new Array();
let firstWeek = "";
if (firstDay !== 0) {
  const padding = "  " + "   ".repeat(firstDay - 1);
  firstWeek = firstWeek.concat(padding);
}
let week = firstWeek;
for (let day = 1, weekday = firstDay; day <= lastDate; day++, weekday++) {
  let numberWidth = 3;
  if (weekday === 0) numberWidth = 2;
  week = week.concat(String(day).padStart(numberWidth));
  if (day === lastDate || weekday === 6) {
    weeks.push(week);
    weekday = -1;
    week = "";
  }
}

const calender = weeks.join("\n");
const formatCalender = [
  `       ${displayMonth}月 ${year}`,
  "日 月 火 水 木 金 土",
  `${calender}`,
].join("\n");

console.log(formatCalender);
