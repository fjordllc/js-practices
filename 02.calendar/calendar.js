#!/usr/bin/env node

import { DateTime } from 'luxon';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

const now = DateTime.now();

const month = args.m ? parseInt(args.m, 10) : now.month;
const year = args.y ? parseInt(args.y, 10) : now.year;


if (month < 1 || month > 12) {
  console.error('Month must be between 1 and 12.');
  process.exit(1);
}

if (year < 1970 || year > 2100) {
  console.error('Year must be between 1970 and 2100.');
  process.exit(1);
}

const firstDay = DateTime.local(year, month, 1);
const lastDay = firstDay.endOf('month');
const daysInMonth = lastDay.day;

let firstWeekday = firstDay.weekday;
if(firstWeekday === 7) {
  firstWeekday = 0;
}

const daysOfWeek = ['日','月','火','水','木','金','土'];

console.log(`\n     ${firstDay.month}月 ${year}`);
console.log(daysOfWeek.join(' '));

let dayString = '';
for(let i = 0; i < firstWeekday; i++) {
  dayString += '   ';
}

for (let day = 1; day <= daysInMonth; day++) {
  dayString += day.toString().padStart(2, ' ') + ' ';
  if ((firstWeekday + day) % 7 === 0) {
    console.log(dayString.trimEnd());
    dayString = '';
  }
}

if (dayString) {
  console.log(dayString.trimEnd());
}
