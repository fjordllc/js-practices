import { runAsync, allAsync, closeDatabase } from "./promise-utils.js";

async function main() {
  try {
    await runAsync(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
    console.log("Table created");

    const result1 = await runAsync("INSERT INTO books (title) VALUES (?)", [
      "Book 1",
    ]);
    console.log("Inserted record with ID:", result1.lastID);

    const result2 = await runAsync("INSERT INTO books (title) VALUES (?)", [
      "Book 2",
    ]);
    console.log("Inserted record with ID:", result2.lastID);

    const rows = await allAsync("SELECT * FROM books");
    console.log("Records:", rows);

    await runAsync("DROP TABLE books");
    console.log("Table deleted");

    closeDatabase();
  } catch (err) {
    console.error("Error:", err.message);
    closeDatabase();
  }
}

main();
