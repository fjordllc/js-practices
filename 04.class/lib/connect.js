import sqlite3 from "sqlite3";

export class Connect {
  constructor() {
    this.db = new sqlite3.Database("./db/memo.db");
  }

  addNote(lines) {
    this.#promiseRun("INSERT INTO notes(title, content) VALUES(?,?)", [
      lines[0],
      lines.slice(1).join("\n"),
    ]).then(() => this.close());
  }

  fetchAllNotes() {
    return this.#promiseAll("SELECT * FROM notes", []);
  }

  deleteNote(id) {
    this.#promiseRun("DELETE FROM notes WHERE id = ?", [id]);
  }

  close() {
    this.db.close();
  }

  #promiseRun(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  #promiseAll(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
