#!/usr/bin/env node

import minimist from "minimist";

function printCalendar(year, month) {
  const firstDateOfMonth = new Date(year, month - 1, 1);
  const monthName = firstDateOfMonth.toLocaleDateString("en-US", {
    month: "long",
  });
  const calendarWidth = 20;
  const calendarHeader = `${monthName} ${year}`;
  const centerAlignCount = (calendarWidth - calendarHeader.length) / 2;
  console.log(`${" ".repeat(centerAlignCount)}${calendarHeader}`);

  const weekHeader = "Su Mo Tu We Th Fr Sa";
  console.log(weekHeader);

  const spacesBeforeFirstDay = 3 * firstDateOfMonth.getDay();
  process.stdout.write(" ".repeat(spacesBeforeFirstDay));

  const lastDateOfMonth = new Date(year, month, 0);
  for (
    let currentDateOfMonth = new Date(firstDateOfMonth);
    currentDateOfMonth <= lastDateOfMonth;
    currentDateOfMonth.setDate(currentDateOfMonth.getDate() + 1)
  ) {
    const isLastDay =
      currentDateOfMonth.getDate() === lastDateOfMonth.getDate();
    const isSaturday = currentDateOfMonth.getDay() === 6;

    process.stdout.write(
      currentDateOfMonth.getDate().toString().padStart(2, " "),
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
const month = argv.m ?? new Date().getMonth() + 1;

printCalendar(year, month);
