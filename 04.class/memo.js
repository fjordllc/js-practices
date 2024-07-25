import minimist from "minimist";
import { Controller } from "./lib/controller.js";

const controller = new Controller();
// await controller.deleteTable();

controller.createTable();

const options = minimist(process.argv.slice(2));
if (options.l) {
  await controller.seeAllTitles();
} else if (options.r) {
  await controller.seeNote();
} else if (options.d) {
  await controller.deleteNote();
} else {
  await controller.createNote();
}
controller.close();
