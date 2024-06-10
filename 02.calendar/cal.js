#!/usr/bin/env node

import minimist from "minimist";
import _ from "lodash-es";

const runCalendar = () => {
  const date = setDate();
  if (!date.year || !date.month) {
    console.error(
      "不正な入力です。年は半角自然数・月は半角1~12で入力してください。",
    );
    return;
  }
  const weeks = buildWeeks(date.year, date.month);
  const calendar = formatCalendar(date.year, date.month, weeks);
  console.log(calendar);
};

const setDate = () => {
  const { y, m } = minimist(process.argv.slice(2));
  const inputYear = y,
    inputMonth = m;
  const today = new Date();
  const year = setYear(inputYear, today);
  const month = setMonth(inputMonth, today);
  const baseData = { year: year, month: month };
  return baseData;
};

const setYear = (inputYear, today) => {
  if (Number.isSafeInteger(inputYear)) return inputYear;
  if (typeof inputYear === "undefined") return today.getFullYear();
  return undefined;
};

const setMonth = (inputMonth, today) => {
  if (Number.isSafeInteger(inputMonth) && 1 <= inputMonth && inputMonth <= 12)
    return inputMonth - 1;
  if (typeof inputMonth === "undefined") return today.getMonth();
  return undefined;
};

const buildWeeks = (year, month) => {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);

  const days = _.range(1, lastDate.getDate() + 1).map((day) => String(day));
  const firstWeekBlankDays = Array(firstDate.getDay()).fill("");
  days.unshift(...firstWeekBlankDays);

  const weeks = _.chunk(days, 7);
  return weeks;
};

const formatCalendar = (year, month, weeks) => {
  const weeksWithSpaces = weeks.map((week) =>
    week.map((day) => day.padStart(3)),
  );
  const formattedWeeks = weeksWithSpaces
    .map(
      (week) => week.join("").substring(1), // padStart(3)時に追加された日曜行の左端の余分な半角空白を、substring(1)で削除
    )
    .join("\n");
  const displayMonth = month + 1;
  const formattedCalendar =
    [
      `      ${displayMonth}月 ${year}`,
      "日 月 火 水 木 金 土",
      formattedWeeks,
    ].join("\n") + "\n";
  return formattedCalendar;
};

runCalendar();
