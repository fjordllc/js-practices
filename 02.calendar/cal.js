#!/usr/bin/env node

import minimist from "minimist";
import _ from "lodash-es";

const buildWeeks = (referenceYear, referenceMonth) => {
  const firstDate = new Date(referenceYear, referenceMonth, 1);
  const lastDate = new Date(referenceYear, referenceMonth + 1, 0);

  const days = _.range(1, lastDate.getDate() + 1).map((i) => String(i));
  const firstWeekBlankDays = Array(firstDate.getDay()).fill("");
  days.unshift(...firstWeekBlankDays);

  const weeks = _.chunk(days, 7);
  return weeks;
};

const renderCalendar = (referenceYear, referenceMonth, weeks) => {
  const weeksWithSpaces = weeks.map((week) =>
    week.map((day) => day.padStart(3)),
  );
  const formattedCalendar = weeksWithSpaces
    .map(
      (week) => week.join("").substring(1), // padStart(3)時に追加された日曜行の左端の余分な半角空白を、substring(1)で削除
    )
    .join("\n");
  const displayMonth = referenceMonth + 1;
  const display =
    [
      `      ${displayMonth}月 ${referenceYear}`,
      "日 月 火 水 木 金 土",
      formattedCalendar,
    ].join("\n") + "\n";
  return display;
};

const { y, m } = minimist(process.argv.slice(2));
const inputYear = y,
  inputMonth = m;
const today = new Date();
const referenceYear = Number.isSafeInteger(inputYear)
  ? inputYear
  : today.getFullYear();
const referenceMonth =
  Number.isSafeInteger(inputMonth) && 1 <= inputMonth && inputMonth <= 12
    ? inputMonth - 1
    : today.getMonth();
const weeks = buildWeeks(referenceYear, referenceMonth);
const calendar = renderCalendar(referenceYear, referenceMonth, weeks);
console.log(calendar);
