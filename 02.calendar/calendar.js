#!/usr/bin/env node

import { DateTime as LuxonDateTime} from "luxon";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const now = LuxonDateTime.now();
const month = args.m || now.month;
const year = args.y || now.year;


if (month < 1 || month > 12) {
  console.error('Month must be between 1 and 12.');
  process.exit(1);
}

if (year < 1970 || year > 2100) {
  console.error('Year must be between 1970 and 2100.');
  process.exit(1);
}

const firstDateOfMonth = LuxonDateTime.local(year, month, 1);
const lastDateOfMonth = firstDateOfMonth.endOf("month");
const daysInMonth = lastDateOfMonth.day;
const firstWeekday = firstDateOfMonth.weekday === 7 ? 0 : firstDateOfMonth.weekday;

console.log ("日 月 火 水 木 金 土");
console.log(`\n     ${firstDateOfMonth.month}月 ${firstDateOfMonth.year}`);

let dayString = '';
for(let i = 0; i < firstWeekday; i++) {
  dayString += '   ';
}

for (let currentDay = 1; currentDay <= daysInMonth; currentDay++) {
  if(dayString !==""){
    dayString += " ";
  }
  dayString += currentDay.toString().padStart(2, " ");

  if ((firstWeekday + currentDay) % 7 === 0) {
    console.log(dayString);
    dayString = "";
  }
}

if (dayString) {
  console.log(dayString);
}
