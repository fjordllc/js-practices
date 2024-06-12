#!/usr/bin/env node

import minimist from "minimist";
import _ from "lodash-es";

const run = () => {
  const baseDate = baseDateToMakeCalendar();
  if (!baseDate.year || !baseDate.month) {
    console.error(
      "不正な入力です。年は半角自然数・月は半角1~12で入力してください。",
    );
    return;
  }

  const weeks = buildWeeks(baseDate.year, baseDate.month);
  const calendar = formatCalendar(baseDate.year, baseDate.month, weeks);
  console.log(calendar);
};

const baseDateToMakeCalendar = () => {
  const { y: inputYear, m: inputMonth } = minimist(process.argv.slice(2));
  const dafaultDate = new Date();

  let year = undefined;
  if (Number.isSafeInteger(inputYear)) {
    year = inputYear;
  }
  if (typeof inputYear === "undefined") {
    year = dafaultDate.getFullYear();
  }

  let month = undefined;
  if (Number.isSafeInteger(inputMonth) && 1 <= inputMonth && inputMonth <= 12) {
    month = inputMonth - 1;
  }
  if (typeof inputMonth === "undefined") {
    month = dafaultDate.getMonth();
  }

  return { year, month };
};

const buildWeeks = (year, month) => {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);

  const days = _.range(1, lastDate.getDate() + 1).map((day) => String(day));
  days.unshift(...Array(firstDate.getDay()).fill(""));
  return _.chunk(days, 7);
};

const formatCalendar = (year, month, weeks) => {
  const paddedWeeks = weeks.map((week) => week.map((day) => day.padStart(3)));
  const formattedWeeks = paddedWeeks
    .map(
      (week) => week.join("").substring(1), // padStart(3)時に追加された日曜行の左端の余分な半角空白を、substring(1)で削除
    )
    .join("\n");

  const formattedCalendar =
    [
      `      ${month + 1}月 ${year}`,
      "日 月 火 水 木 金 土",
      formattedWeeks,
    ].join("\n") + "\n";

  return formattedCalendar;
};

run();
