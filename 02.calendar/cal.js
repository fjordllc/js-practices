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

  console.log(`${" ".repeat(padding)}${monthName} ${year}`);
  console.log(weekHeader);

  process.stdout.write(" ".repeat(firstDaySpace)); // 月初のスペース出力
  while (firstDayOfMonth <= lastDayOfMonth) {
    process.stdout.write(
      String(firstDayOfMonth.getDate()).padStart(2, " ") + " ",
    );
    if (
      firstDayOfMonth.getDay() === 6 ||
      firstDayOfMonth.getDate() === lastDayOfMonth.getDate()
    ) {
      process.stdout.write("\n");
    }
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
  }
}
