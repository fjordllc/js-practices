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

const monthNames = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];
const header = `${monthNames[month - 1]} ${year}`;
const padding = Math.floor((20 - header.length) / 2);
console.log(" ".repeat(padding) + header);
console.log("日 月 火 水 木 金 土");

const startDay = luxon.DateTime.local(year, month, 1).weekday % 7;
let dayString = " ".repeat(startDay * 3);

const daysInMonth = luxon.DateTime.local(year, month).daysInMonth;

for (let day = 1; day <= daysInMonth; day++) {
  const currentDate = luxon.DateTime.local(year, month, day);
  dayString += day.toString().padStart(2, " ");

  if (currentDate.weekday === 6 || day === daysInMonth) {
    console.log(dayString);
    dayString = "";
  } else {
    dayString += " ";
  }
}

console.log();
