import sqlite3 from "sqlite3";

function callback() {
  const db = new sqlite3.Database(":memory:");

  db.serialize(() => {
    db.run(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      (err) => {
        if (err) {
          console.error("Table create error", err);
          return;
        }
        console.log("Table created");

        db.run(
          "INSERT INTO books (title) VALUES ('あいうえお')",
          function (err) {
            if (err) {
              console.error("Insert error", err);
              return;
            }
            console.log("Insert book title with ID", this.lastID);

            db.all("SELECT * FROM books", (err, rows) => {
              if (err) {
                console.error("Select error", err);
                return;
              }
              console.log("Rows :", rows);

              db.run("DROP TABLE books", (err) => {
                if (err) {
                  console.log("Drop error", err);
                  return;
                }
                console.log("Table dropped");
                db.close();
              });
            });
          },
        );
      },
    );
  });
}

function promise() {
  const db = new sqlite3.Database(":memory:");

  function runPromise(db, query) {
    return new Promise((resolve, reject) => {
      db.run(query, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  function allPromise(db, query) {
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  runPromise(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => {
      console.log("Table created");
      return runPromise(db, "INSERT INTO books (title) VALUES ('あいうえお')");
    })
    .then((result) => {
      console.log("Insert book title with ID", result.lastID);
      return allPromise(db, "SELECT * FROM books");
    })
    .then((rows) => {
      console.log("Rows: ", rows);
      return runPromise(db, "DROP TABLE books");
    })
    .then(() => {
      console.log("Table dropped");
      db.close();
    })
    .catch((err) => {
      console.error("Error: ", error);
    });
}

callback();
promise();