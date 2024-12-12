#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const currentDate = new Date();
const year = argv.y ?? currentDate.getFullYear();
const month = argv.m === undefined ? currentDate.getMonth() : argv.m - 1;
const currentOrSpecifiedDate = argv.m === undefined ? new Date() : new Date(year, month);

function printCalendar(currentOrSpecifiedDate, year, month) {
  const monthName = currentOrSpecifiedDate.toLocaleDateString("default", { month: "long" });
  const weekHeader = "Su Mo Tu We Th Fr Sa";
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const emptyDaysBeforeStart = 3 * firstDayOfMonth.getDay();
  const calendarWidth = 20;
  const padding = (calendarWidth - (`${monthName} ${year}`).length) / 2;
  let currentDateInMonth = new Date(year, month, 1);

  console.log(`${" ".repeat(padding)}${monthName} ${year}`);
  console.log(weekHeader);

  process.stdout.write(" ".repeat(emptyDaysBeforeStart));
  while (currentDateInMonth <= lastDayOfMonth) {
    const isLastDay = currentDateInMonth.getDate() === lastDayOfMonth.getDate();
    const isWeekEnd = currentDateInMonth.getDay() === 6;

    if (isWeekEnd || isLastDay) {
      process.stdout.write(
        `${currentDateInMonth.getDate().toString().padStart(2, ' ')}`
        );
      process.stdout.write("\n");
    } else {
      process.stdout.write(
        `${currentDateInMonth.getDate().toString().padStart(2, ' ')} `
        );
    }
    currentDateInMonth.setDate(currentDateInMonth.getDate() + 1);
  }
}

printCalendar(currentOrSpecifiedDate, year, month);
