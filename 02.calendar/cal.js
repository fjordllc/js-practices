#!/usr/bin/env node
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

let currentDate = new Date();
let year = argv.y === undefined ? currentDate.getFullYear() : argv.y;
let month = argv.m === undefined ? currentDate.getMonth() : argv.m - 1;
let DateInfo = argv.m === undefined ? new Date() : new Date(year, month);

noOption(DateInfo);

function noOption(DateInfo) {
    const monthName = DateInfo.toLocaleDateString('default', { month: 'long'})
    const week = 'Su Mo Tu We Th Fr Sa'
    let nowMonthFirst = new Date(year, month, 1);
    const nowMonthLast = new Date(year, month + 1, 0);
    const firstDaySpace = 3 * nowMonthFirst.getDay()

    console.log('  ', monthName, year)
    console.log(week)

    process.stdout.write(" ".repeat(firstDaySpace)); // 月初のスペース出力
    while (nowMonthFirst <= nowMonthLast) {
        process.stdout.write(nowMonthFirst.getDate() + " ");
        // 1桁の場合スペース追加
        if (String(nowMonthFirst.getDate()).length === 1) {
            process.stdout.write(" ")
        }
        if (nowMonthFirst.getDay() === 6) {
            process.stdout.write("\n")
        }
        nowMonthFirst.setDate(nowMonthFirst.getDate()+ 1);
    }
}
