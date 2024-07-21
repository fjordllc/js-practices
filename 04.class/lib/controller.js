import readline from "readline";
import { Connect } from "./connect.js";
import { NoteList } from "./note_list.js";

export class Controller {
  createTable() {
    const connect = new Connect();
    connect.createTable();
    connect.close();
  }

  async seeAllNotes() {
    const connect = new Connect();
    const notes = await connect.fetchAllNotes();
    const noteList = new NoteList(notes);
    noteList.seeAllTitles();
    connect.close();
  }

  async seeNote() {
    const connect = new Connect();
    const notes = await connect.fetchAllNotes();
    const noteList = new NoteList(notes);
    const note = await noteList.selectNote("Choose a note you want to see:");
    console.log(note.title);
    console.log(note.content);
    connect.close();
  }

  async deleteNote() {
    const connect = new Connect();
    const notes = await connect.fetchAllNotes();
    const noteList = new NoteList(notes);
    const note = await noteList.selectNote("Choose a memo you want to delete:");
    connect.deleteNote(note.id);
    connect.close();
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
        const connect = new Connect();
        connect.addNote(lines);
        connect.close();
      }
    });
  }
}
