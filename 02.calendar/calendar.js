#!/usr/bin/env node

import { DateTime as LuxonDateTime } from "luxon";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const now = LuxonDateTime.now();
const year = args.y || now.year;
const month = args.m || now.month;

const date = LuxonDateTime.local(year, month, 1);

if (month < 1 || month > 12) {
  console.error("Month must be between 1 and 12.");
  process.exit(1);
}

if (year < 1970 || year > 2100) {
  console.error("Year must be between 1970 and 2100.");
  process.exit(1);
}

const firstDateOfMonth = date.startOf("month");
const lastDateOfMonth = firstDateOfMonth.endOf("month");
const daysInMonth = lastDateOfMonth.day;
const firstWeekday = firstDateOfMonth.weekday % 7;

console.log(`     ${firstDateOfMonth.setLocale("ja").toFormat("M月 yyyy")}`);
console.log("日 月 火 水 木 金 土");

let dayString = " ".repeat(firstWeekday * 3);

for (let currentDay = 1; currentDay <= daysInMonth; currentDay++) {
  dayString += currentDay.toString().padStart(2, " ") + " ";

  if ((firstWeekday + currentDay) % 7 === 0 || currentDay === daysInMonth) {
    console.log(dayString.trimEnd());
    dayString = "";
  }
}
