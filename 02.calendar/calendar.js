import { DateTime } from 'luxon';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const today = DateTime.now();

/*入力の有無によって値を変更*/
const entered_year = parseInt(argv['-y']) || today.year;
const entered_month = parseInt(argv['-m']) || today.month;

/*日付を取得*/
const dt = DateTime.fromObject({
    year: entered_year,
    month: entered_month
});

/*calendarを表示*/
console.log("      %i月%i\n日 月 火 水 木 金 土\n", dt.year, dt.month);

