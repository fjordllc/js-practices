import minimist from "minimist";
import { Controller } from "./lib/controller.js";

const controller = new Controller();
// await controller.deleteTable();
await controller.createTable();

const options = minimist(process.argv.slice(2));
if (options.l) {
  controller.seeAllTitles();
} else if (options.r) {
  controller.seeNote();
} else if (options.d) {
  controller.deleteNote();
} else {
  controller.createNote();
}

controller.close();
