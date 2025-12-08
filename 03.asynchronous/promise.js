import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { dbClosePromise, dbRunPromise } from "./dbFunction.js";
import { dbGetPromise } from "./dbFunction.js";

let db = new sqlite3.Database(":memory:");

dbRunPromise(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return dbRunPromise(
      db,
      "INSERT INTO books (title) VALUES (?)",
      "Railsの教科書",
    );
  })
  .then((id) => {
    console.log(id.lastID);
  })
  .catch((error) => {
    if (error.code === "SQLITE_CONSTRAINT") {
      console.error(error.message);
    } else {
      throw error;
    }
  })
  .then(() => {
    return dbGetPromise(
      db,
      "SELECT * FROM books WHERE title = ?",
      "Railsの教科書",
    );
  })
  .then((book) => {
    console.log(book);
  })
  .catch((error) => {
    if (error.code === "SQLITE_ERROR") {
      console.error(error.message);
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
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return dbRunPromise(db, "INSERT INTO books (title) VALUES (?)", null);
  })
  .then((id) => {
    console.log(id.lastID);
  })
  .catch((error) => {
    if (error.code === "SQLITE_CONSTRAINT") {
      console.error(error.message);
    } else {
      throw error;
    }
  })
  .then(() => {
    return dbGetPromise(
      db,
      "SELECT * FROM book WHERE title = ?",
      "Railsの教科書",
    );
  })
  .then((book) => {
    console.log(book);
  })
  .catch((error) => {
    if (error.code === "SQLITE_ERROR") {
      console.error(error.message);
    } else {
      throw error;
    }
  })
  .finally(() => {
    return dbClosePromise(db)
      .then(() => {})
      .catch(() => {});
  });
