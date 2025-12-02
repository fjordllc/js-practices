import sqlite3 from "sqlite3";
import timers from "timers/promises";

let db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books (title) VALUES ('report')", function () {
      console.log(this.lastID);
      db.get("SELECT * FROM books", (error, book) => {
        if (error) {
          console.error(error);
        }
        console.log(book);
      });
      db.close();
    });
  },
);

await timers.setTimeout(100);
db = new sqlite3.Database(":memory:");
db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  function () {
    db.run("INSERT INTO books (title) VALUES (NULL)", (error) => {
      if (error) {
        console.error(error);
      }
      db.run("INSERT INTO books (title) VALUES ('report')", () => {
        db.get(
          "SELECT * FROM book WHERE title = 'report'",
          (error, content) => {
            if (error) {
              console.error(error);
            } else {
              console.log(content);
            }
          },
        );
        db.close();
      });
    });
  },
);
