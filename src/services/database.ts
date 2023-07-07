import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./technical-test.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});
export default db;
