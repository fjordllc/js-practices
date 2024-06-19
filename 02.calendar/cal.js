#!/usr/bin/env node

import minimist from "minimist";
import _ from "lodash-es";

const run = () => {
  const { year, month } = selectYearAndMonth();
  if (!year || !month) {
    console.error(
      "不正な入力です。年は1970~2100、月は1~12の間で半角自然数を使って入力してください。",
    );
    return;
  }

  const weeks = buildWeeks(year, month);
  const calendar = formatCalendar(year, month, weeks);
  console.log(calendar);
};

const selectYearAndMonth = () => {
  const { y: inputYear, m: inputMonth } = minimist(process.argv.slice(2));

  if (Number(inputYear) < 1970 || 2100 < Number(inputYear)) {
    return { year: undefined, month: undefined };
  }
  if (Number(inputMonth) < 1 || 12 < Number(inputMonth)) {
    return { year: undefined, month: undefined };
  }

  const defaultDate = new Date();
  const year = inputYear ?? defaultDate.getFullYear();
  const month = (inputMonth ?? defaultDate.getMonth() + 1) - 1; // inputMonthは1~12想定のため、getMonth()の値に+1をして揃え、判定したのちに-1を行ってDate型用の数値に戻す

  return { year, month };
};

const buildWeeks = (year, month) => {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);

  let days = _.range(1, lastDate.getDate() + 1).map((day) => String(day));
  days = [...Array(firstDate.getDay()).fill(""), ...days];
  return _.chunk(days, 7);
};

const formatCalendar = (year, month, weeks) => {
  const paddedWeeks = weeks.map((week) => week.map((day) => day.padStart(3)));
  const formattedWeeks = paddedWeeks.map(
    (week) => week.join("").substring(1), // padStart(3)時に追加された日曜行の左端の余分な半角空白を、substring(1)で削除
  );
  const formattedCalendar =
    [
      `      ${month + 1}月 ${year}`,
      "日 月 火 水 木 金 土",
      ...formattedWeeks,
    ].join("\n") + "\n";

  return formattedCalendar;
};

run();
