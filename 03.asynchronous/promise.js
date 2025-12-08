import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { dbClosePromise, dbRunPromise } from "./dbFunction.js";
import { dbGetPromise } from "./dbFunction.js";

let db = new sqlite3.Database(":memory:");

dbRunPromise(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  db,
)
  .then(() => {
    return dbRunPromise("INSERT INTO books (title) VALUES ('report')", db);
  })
  .then((id) => {
    console.log(id.lastID);
  })
  .catch((error) => {
    if (error.code === "SQLITE_CONSTRAINT") {
      console.error(error);
    } else {
      throw error;
    }
  })
  .then(() => {
    return dbGetPromise("SELECT * FROM books WHERE title = 'report'", db);
  })
  .then((book) => {
    console.log(book);
  })
  .catch((error) => {
    if (error.code === "SQLITE_ERROR") {
      console.error(error);
    } else {
      throw error;
    }
  })
  .finally(() => {
    return dbClosePromise(db)
      .then(() => {})
      .catch(() => {});
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
  .then((id) => {
    console.log(id.lastID);
  })
  .catch((error) => {
    if (error.code === "SQLITE_CONSTRAINT") {
      console.error(error);
    } else {
      throw error;
    }
  })
  .then(() => {
    return dbGetPromise("SELECT * FROM book WHERE title = 'report'", db);
  })
  .then((book) => {
    console.log(book);
  })
  .catch((error) => {
    if (error.code === "SQLITE_ERROR") {
      console.error(error);
    } else {
      throw error;
    }
  })
  .finally(() => {
    return dbClosePromise(db)
      .then(() => {})
      .catch(() => {});
  });
