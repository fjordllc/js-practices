import readline from "readline";
import { Connect } from "./connect.js";
import { NoteList } from "./note_list.js";

export class Controller {
  constructor() {
    this.connect = new Connect();
  }

  async seeAllNotes() {
    const connect = new Connect();
    const notes = await connect.fetchAllNotes();
    const noteList = new NoteList(notes);
    noteList.seeAllTitles();
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

  createNote() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const lines = [];
    rl.on("line", (line) => {
      if (line === "EOF") {
        rl.close();
      } else {
        lines.push(line);
      }
    });

    rl.on("close", async () => {
      if (lines.length !== 0) {
        this.connect.addNote(lines);
      }
    });
  }

  close() {
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
}
