#! /usr/bin/env node

import minimist from "minimist";

const buildWeeks = (referenceYear, referenceMonth) => {
  const firstDate = new Date(referenceYear, referenceMonth, 1);
  const lastDate = new Date(referenceYear, referenceMonth + 1, 0);
  const days = [...Array(lastDate.getDate())].map((_, i) => i + 1);
  const firstWeekBlankDays = Array(firstDate.getDay()).fill("");
  days.unshift(...firstWeekBlankDays);
  const rowCount = Math.ceil(days.length / 7);
  const weeks = Array(rowCount)
    .fill("")
    .map((_, i) => days.slice(i * 7, (i + 1) * 7));
  return weeks;
};

const formatCalendar = (referenceYear, referenceMonth, weeks) => {
  const weeksWithArrangedDays = weeks.map((week) =>
    week.map((day) => String(day).padStart(3)),
  );
  const arrangedCalendar = weeksWithArrangedDays
    .map(
      (week) => week.join("").substring(1), //padStart(3)時に追加された日曜行の左端の余分な半角空白を、substring(1)で削除
    )
    .join("\n");
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
const weeks = buildWeeks(referenceYear, referenceMonth);
const calendar = formatCalendar(referenceYear, referenceMonth, weeks);
console.log(calendar);
