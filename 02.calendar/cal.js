#! /usr/bin/env node

import minimist from "minimist";

const buildCalender = (baseYear, baseMonth) => {
  const month = baseMonth - 1;
  const firstDay = new Date(baseYear, month, 1).getDay();
  const lastDate = new Date(baseYear, month + 1, 0).getDate();
  const weeks = [];
  let week = "";
  if (firstDay !== 0) {
    week = week.concat("   ".repeat(firstDay));
  }
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
  const formattedCalender =
    [
      `      ${baseMonth}月 ${baseYear}`,
      "日 月 火 水 木 金 土",
      baseCalender,
    ].join("\n") + "\n";
  return formattedCalender;
};

const today = new Date();
const argv = minimist(process.argv.slice(2), {
  alias: {
    y: "inputYear",
    m: "inputMonth",
  },
});
const baseYear = argv.inputYear ?? today.getFullYear();
const baseMonth = argv.inputMonth ?? today.getMonth() + 1;
const baseCalender = buildCalender(baseYear, baseMonth);
const calender = formatCalender(baseYear, baseMonth, baseCalender);
console.log(calender);
