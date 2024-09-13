#!/usr/bin/env node

import * as luxon from "luxon";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const now = luxon.DateTime.now();
const year = args.y ?? now.year;
const month = args.m ?? now.month;

if (month < 1 || month > 12) {
  console.error("Month must be between 1 and 12.");
  process.exit(1);
}

if (year < 1970 || year > 2100) {
  console.error("Year must be between 1970 and 2100.");
  process.exit(1);
}

console.log(`${" ".repeat(6)}${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

const firstDayOfMonth = luxon.DateTime.local(year, month, 1);
const firstDayOfWeek = firstDayOfMonth.weekday % 7;
process.stdout.write(" ".repeat(firstDayOfWeek * 3));

const lastDayOfMonth = firstDayOfMonth.endOf("month");

for (
  let currentDay = firstDayOfMonth.plus({ days: 0 });
  currentDay <= lastDayOfMonth;
  currentDay = currentDay.plus({ days: 1 })
) {
  process.stdout.write(currentDay.day.toString().padStart(2, " "));

  const isLastDayOfMonth = currentDay.plus({ days: 1 }) > lastDayOfMonth;
  if (currentDay.weekday === 6 || isLastDayOfMonth) {
    console.log();
  } else {
    process.stdout.write(" ");
  }
}

console.log();
