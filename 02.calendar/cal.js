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
const space = 6;
console.log(`${" ".repeat(space)}${header}`);
console.log("日 月 火 水 木 金 土");

let currentDate = luxon.DateTime.local(year, month, 1);
const startDay = currentDate.weekday % 7;
let dayString = " ".repeat(startDay * 3);
const daysInMonth = currentDate.daysInMonth;
let weekCount = 0;
let lastLineNoNewline = false;

for (let i = 1; i <= daysInMonth; i++) {
  dayString += currentDate.day.toString().padStart(2, " ");

  if (currentDate.weekday === 6 || i === daysInMonth) {
    weekCount++;
    if (i === daysInMonth && weekCount === 6) {
      process.stdout.write(dayString);
      lastLineNoNewline = true;
    } else {
      console.log(dayString);
    }
    dayString = "";
  } else {
    dayString += " ";
  }

  currentDate = currentDate.plus({ days: 1 });
}

if (weekCount < 6 && !lastLineNoNewline) {
  console.log();
}

if (lastLineNoNewline) {
  console.log();
}
