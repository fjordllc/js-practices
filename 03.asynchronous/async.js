import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { dbRunPromise } from "./dbFunction.js";
import { dbGetPromise } from "./dbFunction.js";
let db = new sqlite3.Database(":memory:");

async function successAsync() {
  try {
    await dbRunPromise(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      db,
    );
    try {
      await dbRunPromise("INSERT INTO books (title) VALUES ('report')", db);
      const id = await dbGetPromise(
        "SELECT id FROM books WHERE title = 'report'",
        db,
      );
      console.log(id);
    } catch (error) {
      console.error(error);
    }
    try {
      const content = await dbGetPromise(
        "SELECT * FROM books WHERE title = 'report'",
        db,
      );
      console.log(content);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  } finally {
    db.close();
  }
}
successAsync();

await timers.setTimeout(100);
db = new sqlite3.Database(":memory:");
async function failureAsync() {
  try {
    await dbRunPromise(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      db,
    );
    try {
      await dbRunPromise("INSERT INTO books (title) VALUES (NULL)", db);
      const id = await dbGetPromise(
        "SELECT id FROM books WHERE title = 'report'",
        db,
      );
      console.log(id);
    } catch (error) {
      console.error(error);
    }
    try {
      const content = await dbGetPromise(
        "SELECT * FROM book WHERE title = 'report'",
        db,
      );
      console.log(content);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  } finally {
    db.close();
  }
}

failureAsync();
