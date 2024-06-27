import sqlite3 from "sqlite3";

export class Connect {
  constructor() {
    this.db = new sqlite3.Database("./db/memo.db");
  }

  insertMemo(lines) {
    this.#promiseRun("INSERT INTO notes(title, content) VALUES(?,?)", [
      lines[0],
      lines.slice(1).join("\n"),
    ]).then(() => this.close());
  }

  deleteMemo(id) {
    this.#promiseRun("DELETE FROM notes WHERE id = ?", [id]);
  }

  getMemo(id) {
    return this.#promiseGet("SELECT * FROM notes WHERE id = ?", [id]);
  }

  getAllNotes() {
    return this.#promiseAll("SELECT * FROM notes", []);
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

  #promiseGet(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(query, params, function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
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
