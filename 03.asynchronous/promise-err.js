import { runAsync, getAsync, closeDatabase } from "./promise-utils.js";

runAsync(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    console.log("Table created");
    return runAsync("INSERT INTO books (title) VALUES (?)", ["Book 1"]);
  })
  .then((result) => {
    console.log("Inserted record with ID:", result.lastID);

    return runAsync("INSERT INTO books (title) VALUES (?)", ["Book 1"]);
  })
  .catch((err) => {
    console.error("Error inserting duplicate record:", err.message);
    return Promise.resolve();
  })
  .then(() => {
    return getAsync("SELECT * FROM non_existent_table");
  })
  .catch((err) => {
    console.error("Error fetching from non-existent table:", err.message);
    return Promise.resolve();
  })
  .then(() => {
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
