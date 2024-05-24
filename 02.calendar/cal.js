import minimist from "minimist";

const buildCalender = (baseYear, baseMonth) => {
  const month = baseMonth - 1;
  const firstDay = new Date(baseYear, month, 1).getDay();
  const lastDate = new Date(baseYear, month + 1, 0).getDate();
  const weeks = new Array();
  let firstWeek = new String();
  if (firstDay !== 0) {
    firstWeek = firstWeek.concat("   ".repeat(firstDay));
  }
  let week = firstWeek;
  for (let day = 1, weekday = firstDay; day <= lastDate; day++, weekday++) {
    week = week.concat(String(day).padStart(3));
    if (day === lastDate || weekday === 6) {
      weeks.push(week.substring(1));
      weekday = -1;
      week = "";
    }
  }
  return weeks.join("\n");
};

const formatCalender = (baseYear, baseMonth, baseCalender) => {
  const formatedCalender =
    [
      `      ${baseMonth}月 ${baseYear}`,
      "日 月 火 水 木 金 土",
      `${baseCalender}`,
    ].join("\n") + "\n";
  return formatedCalender;
};

const today = new Date();
const { m, y } = minimist(process.argv.slice(2));
const baseYear = y || today.getFullYear();
const baseMonth = m || today.getMonth() + 1;
const baseCalender = buildCalender(baseYear, baseMonth);
const calender = formatCalender(baseYear, baseMonth, baseCalender);
console.log(calender);
// process.stdout.write(calender);
