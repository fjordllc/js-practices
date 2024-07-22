import minimist from "minimist";
import { Controller } from "./lib/controller.js";

const controller = new Controller();
controller.createTable();

const options = minimist(process.argv.slice(2));
if (options.l) {
  controller.seeAllNotes();
} else if (options.r) {
  controller.seeNote();
} else if (options.d) {
  controller.deleteNote();
} else {
  controller.createNote();
}

controller.close();
