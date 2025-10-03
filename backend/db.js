import sqlite3 from "sqlite3";

// connect to database file
const db = new sqlite3.Database("./notes.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");

    // Create table if not exists
    db.run(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        }
      }
    );
  }
});

export default db;
