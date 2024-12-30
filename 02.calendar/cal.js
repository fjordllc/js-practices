#!/usr/bin/env node
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const currentDate = new Date();
const year = argv.y ?? currentDate.getFullYear();
const month = argv.m === undefined ? currentDate.getMonth() : argv.m - 1;
const currentOrSpecifiedDate =
  argv.m === undefined ? new Date() : new Date(year, month);

printCalendar(currentOrSpecifiedDate, year, month);

function printCalendar(currentOrSpecifiedDate) {
  const monthName = currentOrSpecifiedDate.toLocaleDateString("default", {
    month: "long",
  });
  const weekHeader = "Su Mo Tu We Th Fr Sa";
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDaySpace = 3 * firstDayOfMonth.getDay();
  const calendarWidth = 20;
  const padding = (calendarWidth - `${monthName} ${year}`.length) / 2;
  let currentDateInMonth = new Date(year, month, 1);

  console.log(`${" ".repeat(padding)}${monthName} ${year}`);
  console.log(weekHeader);

  process.stdout.write(" ".repeat(firstDaySpace)); // 月初のスペース出力
  for (
    let currentDateInMonth = new Date(year, month, 1);
    currentDateInMonth <= lastDayOfMonth;
    currentDateInMonth.setDate(currentDateInMonth.getDate() + 1)
  ) {
    const isLastDay = currentDateInMonth.getDate() === lastDayOfMonth.getDate();
    const isSaturday = currentDateInMonth.getDay() === 6;

    if (isSaturday || isLastDay) {
      process.stdout.write(
        `${currentDateInMonth.getDate().toString().padStart(2, " ")}`,
      );
      process.stdout.write("\n");
    } else {
      process.stdout.write(
        `${currentDateInMonth.getDate().toString().padStart(2, " ")} `,
      );
    }
  }
}
