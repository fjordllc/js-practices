#!/usr/bin/env node

import minimist from "minimist";

function printCalendar(date) {
  const monthName = date.toLocaleDateString("default", {
    month: "long",
  });
  const calendarWidth = 20;
  const calendarHeader = `${monthName} ${date.getFullYear()}`;
  const spacesToCenter = (calendarWidth - calendarHeader.length) / 2;
  console.log(`${" ".repeat(spacesToCenter)}${calendarHeader}`);

  const weekHeader = "Su Mo Tu We Th Fr Sa";
  console.log(weekHeader);

  const firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const spacesBeforeFirstDay = 3 * firstDateOfMonth.getDay();
  process.stdout.write(" ".repeat(spacesBeforeFirstDay));

  const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  for (
    let currentDateInMonth = firstDateOfMonth;
    currentDateInMonth <= lastDateOfMonth;
    currentDateInMonth.setDate(currentDateInMonth.getDate() + 1)
  ) {
    const isLastDay =
      currentDateInMonth.getDate() === lastDateOfMonth.getDate();
    const isSaturday = currentDateInMonth.getDay() === 6;

    process.stdout.write(
      currentDateInMonth.getDate().toString().padStart(2, " "),
    );

    if (isSaturday || isLastDay) {
      process.stdout.write("\n");
    } else {
      process.stdout.write(" ");
    }
  }
}

const argv = minimist(process.argv.slice(2));
const currentDate = new Date();
const year = argv.y ?? currentDate.getFullYear();
const date = argv.m === undefined ? currentDate : new Date(year, argv.m - 1);

printCalendar(date);
