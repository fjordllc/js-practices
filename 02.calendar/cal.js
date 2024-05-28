#! /usr/bin/env node

import minimist from "minimist";

const buildCalender = (baseYear, baseMonth) => {
  const firstDate = new Date(baseYear, baseMonth, 1);
  const lastDate = new Date(baseYear, baseMonth + 1, 0);
  const rawCalenderData = [...Array(lastDate.getDate())].map((_, i) => i + 1);
  rawCalenderData.unshift(...Array(firstDate.getDay()));
  const weeklyCalender = sliceByNumber(rawCalenderData, 7);
  console.log(weeklyCalender);
  return weeklyCalender;
};

const sliceByNumber = (array, number) => {
  const length = Math.ceil(array.length / number);
  return new Array(length)
    .fill()
    .map((_, i) => array.slice(i * number, (i + 1) * number));
};

const formatCalender = (baseYear, baseMonth, baseCalender) => {
  const displayMonth = baseMonth + 1;
  const formattedCalender =
    [
      `      ${displayMonth}月 ${baseYear}`,
      "日 月 火 水 木 金 土",
      baseCalender,
    ].join("\n") + "\n";
  return formattedCalender;
};

const today = new Date();
const { y, m } = minimist(process.argv.slice(2));
const inputYear = y;
const inputMonth = m;
const baseYear = inputYear ?? today.getFullYear();
const baseMonth =
  typeof inputMonth === "number" && 1 <= inputMonth <= 12
    ? inputMonth - 1
    : today.getMonth();
const baseCalender = buildCalender(baseYear, baseMonth);
const calender = formatCalender(baseYear, baseMonth, baseCalender);
console.log(calender);

// const buildCalender = (baseYear, baseMonth) => {
//   const month = baseMonth;
//   const firstDay = new Date(baseYear, month, 1).getDay();
//   const lastDate = new Date(baseYear, month + 1, 0).getDate();
//   const weeks = [];
//   let week = "".concat("   ".repeat(firstDay));
//   for (let day = 1, weekday = firstDay; day <= lastDate; day++, weekday++) {
//     week = week.concat(String(day).padStart(3));
//     if (day === lastDate || weekday === 6) {
//       weeks.push(week.substring(1));
//       weekday = -1;
//       week = "";
//     }
//   }
//   return weeks.join("\n");
// };

// const formatCalender = (baseYear, baseMonth, baseCalender) => {
//   const displayMonth = baseMonth + 1;
//   const formattedCalender =
//     [
//       `      ${displayMonth}月 ${baseYear}`,
//       "日 月 火 水 木 金 土",
//       baseCalender,
//     ].join("\n") + "\n";
//   return formattedCalender;
// };

// const today = new Date();
// const argv = minimist(process.argv.slice(2), {
//   alias: {
//     y: "inputYear",
//     m: "inputMonth",
//   },
// });
// const baseYear = argv.inputYear ?? today.getFullYear();
// const baseMonth = argv.inputMonth - 1 ?? today.getMonth(); //Dateクラスの月の計算に沿うように、argv.inputMonthからは1マイナス
// const baseCalender = buildCalender(baseYear, baseMonth);
// const calender = formatCalender(baseYear, baseMonth, baseCalender);
// console.log(calender);
