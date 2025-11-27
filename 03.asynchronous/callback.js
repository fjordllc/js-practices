import sqlite3 from "sqlite3";
import timers from "timers/promises";
let db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  function () {
    db.run("INSERT INTO books (title) VALUES ('report')", function () {
      db.get(
        "SELECT id FROM books WHERE title = 'report'",
        function (error, id) {
          console.log(id);
          db.get("SELECT * FROM books", function (error, content) {
            if (error) {
              console.error(error);
            }
            console.log(content);
          });
          db.close();
        },
      );
    });
  },
);

await timers.setTimeout(100);
db = new sqlite3.Database(":memory:");
db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  function () {
    db.run("INSERT INTO books (title) VALUES (NULL)", function (error) {
      if (error) {
        console.error(error);
      }
      db.run("INSERT INTO books (title) VALUES ('report')", function () {
        db.get("SELECT id FROM books WHERE title = 'report'", function () {
          db.get(
            "SELECT * FROM book WHERE title = 'report'",
            function (error, content) {
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
    });
  },
);
