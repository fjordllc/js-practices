import { runAsync, getAsync, closeDatabase } from "./promise-utils.js";

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

    await runAsync("INSERT INTO books (title) VALUES (?)", ["Book 1"]);
  } catch (err) {
    console.error("Error inserting duplicate record:", err.message);
  }

  try {
    await getAsync("SELECT * FROM non_existent_table");
  } catch (err) {
    console.error("Error fetching from non-existent table:", err.message);
  }

  try {
    await runAsync("DROP TABLE books");
    console.log("Table deleted");
  } catch (err) {
    console.error("Error deleting table:", err.message);
  } finally {
    closeDatabase();
  }
}

main();
