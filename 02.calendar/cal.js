#!/usr/bin/env node

import minimist from "minimist";

function printCalendar(year, month) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = monthNames[month];
  const calendarWidth = 20;
  const calendarHeader = `${monthName} ${year}`;
  const centerAlignCount = (calendarWidth - calendarHeader.length) / 2;
  console.log(`${" ".repeat(centerAlignCount)}${calendarHeader}`);

  const weekHeader = "Su Mo Tu We Th Fr Sa";
  console.log(weekHeader);

  const firstDateOfMonth = new Date(year, month, 1);
  const spacesBeforeFirstDay = 3 * firstDateOfMonth.getDay();
  process.stdout.write(" ".repeat(spacesBeforeFirstDay));

  const lastDateOfMonth = new Date(year, month + 1, 0);
  for (
    let currentDateInMonth = new Date(firstDateOfMonth);
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
const year = argv.y ?? new Date().getFullYear();
const month = argv.m - 1 ?? new Date().getMonth() - 1;

printCalendar(year, month);
