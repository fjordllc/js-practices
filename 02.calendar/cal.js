#! /usr/bin/env node

import minimist from "minimist";

const buildCalendar = (referenceYear, referenceMonth) => {
  const firstDate = new Date(referenceYear, referenceMonth, 1);
  const lastDate = new Date(referenceYear, referenceMonth + 1, 0);
  const days = [...Array(lastDate.getDate())].map((_, i) => i + 1);
  const firstWeekBlankDays = Array(firstDate.getDay()).fill("");
  days.unshift(...firstWeekBlankDays);
  const weeklyCalendar = sliceByNumber(days, 7);
  return weeklyCalendar;
};

const sliceByNumber = (array, number) => {
  const length = Math.ceil(array.length / number);
  return Array(length)
    .fill()
    .map((_, i) => array.slice(i * number, (i + 1) * number));
};

const formatCalendar = (referenceYear, referenceMonth, weeklyCalendar) => {
  const CalendarWithPadding = weeklyCalendar.map((week) =>
    week.map((day) => String(day).padStart(3)),
  );
  //抽象度が高いので変数名を変更する(weekを文字列に変換して連結して、先頭を１文字削除)
  const arrangedCalendar = CalendarWithPadding.map(
    (week) => week.join("").substring(1), //padStart(3)時に追加された日曜行の左端の余分な半角空白を、substring(1)で削除
  ).join("\n");
  const displayMonth = referenceMonth + 1;
  const formattedCalendar =
    [
      `      ${displayMonth}月 ${referenceYear}`,
      "日 月 火 水 木 金 土",
      arrangedCalendar,
    ].join("\n") + "\n";
  return formattedCalendar;
};

const { y, m } = minimist(process.argv.slice(2));
const inputYear = y;
const inputMonth = m;
const today = new Date();
const referenceYear = inputYear ?? today.getFullYear();
const referenceMonth =
  typeof inputMonth === "number" && 1 <= inputMonth <= 12
    ? inputMonth - 1
    : today.getMonth();
const referenceCalendar = buildCalendar(referenceYear, referenceMonth);
const calendar = formatCalendar(
  referenceYear,
  referenceMonth,
  referenceCalendar,
);
console.log(calendar);

// const buildCalendar = (baseYear, baseMonth) => {
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

// const formatCalendar = (baseYear, baseMonth, baseCalendar) => {
//   const displayMonth = baseMonth + 1;
//   const formattedCalendar =
//     [
//       `      ${displayMonth}月 ${baseYear}`,
//       "日 月 火 水 木 金 土",
//       baseCalendar,
//     ].join("\n") + "\n";
//   return formattedCalendar;
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
// const baseCalendar = buildCalendar(baseYear, baseMonth);
// const calendar = formatCalendar(baseYear, baseMonth, baseCalendar);
// console.log(calendar);
