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

const firstDateOfMonth = luxon.DateTime.local(year, month, 1).startOf("month");
const lastDateOfMonth = firstDateOfMonth.endOf("month");

const header = `${firstDateOfMonth.setLocale("ja").toFormat("M月 yyyy")}`;
console.log(header.padStart((header.length + 20) / 2).padEnd(20));
console.log("日 月 火 水 木 金 土");

let dayString = " ".repeat((firstDateOfMonth.weekday % 7) * 3);

for (
  let currentDate = firstDateOfMonth;
  currentDate <= lastDateOfMonth;
  currentDate = currentDate.plus({ days: 1 })
) {
  dayString += currentDate.day.toString().padStart(2, " ") + " ";

  if (currentDate.weekday === 6 || currentDate.equals(lastDateOfMonth)) {
    console.log(dayString.trimEnd());
    dayString = "";
  }
}

console.log("");
