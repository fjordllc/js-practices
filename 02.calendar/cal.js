#!/usr/bin/env node
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const currentDate = new Date();
const year = argv.y === undefined ? currentDate.getFullYear() : argv.y;
const month = argv.m === undefined ? currentDate.getMonth() : argv.m - 1;
const DateInfo = argv.m === undefined ? new Date() : new Date(year, month);

printCalendar(DateInfo);

function printCalendar(DateInfo) {
  const monthName = DateInfo.toLocaleDateString("default", { month: "long" });
  const weekHeader = "Su Mo Tu We Th Fr Sa";
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDaySpace = 3 * firstDayOfMonth.getDay();

  console.log("  ", monthName, year);
  console.log(weekHeader);

  process.stdout.write(" ".repeat(firstDaySpace)); // 月初のスペース出力
  while (firstDayOfMonth <= lastDayOfMonth) {
    process.stdout.write(firstDayOfMonth.getDate() + " ");
    // 1桁の場合スペース追加
    if (String(firstDayOfMonth.getDate()).length === 1) {
      process.stdout.write(" ");
    }
    if (firstDayOfMonth.getDay() === 6) {
      process.stdout.write("\n");
    }
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
  }
}
