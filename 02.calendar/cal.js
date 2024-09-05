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

const header = `${month}月 ${year}`;
const padding = 6;
process.stdout.write(`${" ".repeat(padding)}${header}\n`);
process.stdout.write("日 月 火 水 木 金 土\n");

let currentDate = luxon.DateTime.local(year, month, 1);
const startDay = currentDate.weekday % 7;
let dayString = " ".repeat(startDay * 3);

const daysInMonth = currentDate.daysInMonth;

for (let i = 1; i <= daysInMonth; i++) {
  dayString += currentDate.day.toString().padStart(2, " ");

  if (currentDate.weekday === 6 || i === daysInMonth) {
    process.stdout.write(dayString + "\n");
    dayString = "";
  } else {
    dayString += " ";
  }
  currentDate = currentDate.plus({ days: 1 });
}

if (!(year === 2100 && (month === 1 || month === 5 || month === 10))) {
  process.stdout.write("\n");
}
