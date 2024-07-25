import readline from "readline";
import { Connect } from "./connect.js";
import { NoteList } from "./note_list.js";

export class Controller {
  constructor() {
    this.connect = new Connect();
  }

  // async deleteTable() {
  //   this.connect.deleteTable();
  // }

  async createTable() {
    this.connect.createTable();
  }

  async seeAllTitles() {
    const noteList = await this.#fetchAllNotes();
    if (typeof noteList !== "undefined") {
      noteList.seeAllTitles();
    }
  }

  async seeNote() {
    const noteList = await this.#fetchAllNotes();
    if (typeof noteList !== "undefined") {
      const note = await noteList.selectNote("Choose a note you want to see:");
      console.log(note.title);
      console.log(note.content);
    }
  }

  async deleteNote() {
    const noteList = await this.#fetchAllNotes();
    if (typeof noteList !== "undefined") {
      const note = await noteList.selectNote(
        "Choose a memo you want to delete:",
      );
      this.connect.deleteNote(note.id);
    }
  }

  async createNote() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const lines = [];
    await this.#promiseBasedReadlineOn(rl, "line", (input, resolve) => {
      if (input === "EOF") {
        if (lines.length === 0) {
          rl.close();
          resolve();
          return;
        }
        if (!lines[0]) {
          lines[0] = "NoTitle";
        }
        this.connect.addNote(lines);
        rl.close();
        resolve();
      } else {
        lines.push(input);
      }
    });
  }

  async close() {
    this.connect.close();
  }

  async #fetchAllNotes() {
    const notes = await this.connect.fetchAllNotes();
    if (notes.length === 0) {
      console.log("There are no notes yet.");
      return;
    }
    return new NoteList(notes);
  }

  #promiseBasedReadlineOn = (rl, event, callback) => {
    return new Promise((resolve) => {
      rl.on(event, (input) => {
        callback(input, resolve);
      });
    });
  };
}
