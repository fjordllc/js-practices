import { runAsync, allAsync, closeDatabase } from "./promise-utils.js";

runAsync(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    console.log("Table created");
    return runAsync("INSERT INTO books (title) VALUES (?)", ["Book 1"]);
  })
  .then((result) => {
    console.log("Inserted record with ID:", result.lastID);
    return runAsync("INSERT INTO books (title) VALUES (?)", ["Book 2"]);
  })
  .then((result) => {
    console.log("Inserted record with ID:", result.lastID);
    return allAsync("SELECT * FROM books");
  })
  .then((rows) => {
    console.log("Records:", rows);
    return runAsync("DROP TABLE books");
  })
  .then(() => {
    console.log("Table deleted");
    closeDatabase();
  })
  .catch((err) => {
    console.error("Error:", err.message);
    closeDatabase();
  });
