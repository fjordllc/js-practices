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

const firstDate = luxon.DateTime.local(year, month, 1);
const lastDate = firstDate.endOf("month");

process.stdout.write(" ".repeat((firstDate.weekday === 7 ? 0 :firstDate.weekday) * 3));

for (
  let currentDate = firstDate;
  currentDate <= lastDate;
  currentDate = currentDate.plus({ days: 1 })
) {
  process.stdout.write(currentDate.day.toString().padStart(2, " "));

  const isLastDate = currentDate.hasSame(lastDate, "day");
  if (currentDate.weekday === 6 || isLastDate) {
    console.log();
  } else {
    process.stdout.write(" ");
  }
}

console.log();
