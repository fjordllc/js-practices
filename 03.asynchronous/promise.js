import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { dbRunPromise } from "./dbFunction.js";
import { dbGetPromise } from "./dbFunction.js";

let db = new sqlite3.Database(":memory:");

dbRunPromise(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  db,
)
  .then(() => {
    return dbRunPromise("INSERT INTO books (title) VALUES ('report')", db);
  })
  .then(() => {
    return dbGetPromise("SELECT id FROM books WHERE title = 'report'", db);
  })
  .then((id) => {
    console.log(id);
  })
  .catch((error) => {
    console.error(error);
  })
  .then(() => {
    return dbGetPromise("SELECT * FROM books WHERE title = 'report'", db);
  })
  .then((content) => {
    console.log(content);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    db.close();
  });

await timers.setTimeout(100);

db = new sqlite3.Database(":memory:");
dbRunPromise(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  db,
)
  .then(() => {
    return dbRunPromise("INSERT INTO books (title) VALUES (NULL)", db);
  })
  .then(() => {
    return dbGetPromise("SELECT id FROM books WHERE title = 'report'", db);
  })
  .then((id) => {
    console.log(id);
  })
  .catch((error) => {
    console.error(error);
  })
  .then(() => {
    return dbGetPromise("SELECT * FROM book WHERE title = 'report'", db);
  })
  .then((content) => {
    console.log(content);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    db.close();
  });
