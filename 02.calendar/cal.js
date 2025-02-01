#!/usr/bin/env node

import minimist from "minimist";

function printCalendar(targetDate) {
  const monthName = targetDate.toLocaleDateString("default", {
    month: "long",
  });
  const calendarWidth = 20;
  const calendarHeader = `${monthName} ${targetDate.getFullYear()}`;
  const centerAlignCount = (calendarWidth - calendarHeader.length) / 2;
  console.log(`${" ".repeat(centerAlignCount)}${calendarHeader}`);

  const weekHeader = "Su Mo Tu We Th Fr Sa";
  console.log(weekHeader);

  const firstDateOfMonth = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    1,
  );
  const spacesBeforeFirstDay = 3 * firstDateOfMonth.getDay();
  process.stdout.write(" ".repeat(spacesBeforeFirstDay));

  const lastDateOfMonth = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth() + 1,
    0,
  );
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
const targetDate =
  argv.m === undefined ? new Date() : new Date(year, argv.m - 1);

printCalendar(targetDate);
