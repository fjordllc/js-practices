import sqlite3 from "sqlite3";
import { dbRunPromise } from "./dbFunction.js";
import { dbGetPromise } from "./dbFunction.js";

async function main() {
  let db = new sqlite3.Database(":memory:");
  await successAsync(db);
  db = new sqlite3.Database(":memory:");
  failureAsync(db);
}

async function successAsync(db) {
  try {
    await dbRunPromise(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      db,
    );
    try {
      let book = await dbRunPromise(
        "INSERT INTO books (title) VALUES ('Railsの教科書')",
        db,
      );
      console.log(book.lastID);
    } catch (error) {
      if (error.code === "SQLITE_CONSTRAINT") {
        console.error(error.message);
      } else {
        throw error;
      }
    }
    try {
      const book = await dbGetPromise(
        "SELECT * FROM books WHERE title = 'Railsの教科書'",
        db,
      );
      console.log(book);
    } catch (error) {
      if (error.code === "SQLITE_ERROR") {
        console.error(error.message);
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    db.close();
  }
}

async function failureAsync(db) {
  try {
    await dbRunPromise(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      db,
    );
    try {
      let book = await dbRunPromise(
        "INSERT INTO books (title) VALUES (NULL)",
        db,
      );
      console.log(book.lastID);
    } catch (error) {
      if (error.code === "SQLITE_CONSTRAINT") {
        console.error(error.message);
      } else {
        throw error;
      }
    }
    try {
      const book = await dbGetPromise(
        "SELECT * FROM book WHERE title = 'Railsの教科書'",
        db,
      );
      console.log(book);
    } catch (error) {
      if (error.code === "SQLITE_ERROR") {
        console.error(error.message);
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    db.close();
  }
}

main();
