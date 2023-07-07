const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./technical-test.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
});
console.info("Connected to the SQlite database.");
createTable();

console.log("Inserting cars...");
for (let i = 0; i < 2; i++) {
  axios
    .get("https://api.api-ninjas.com/v1/cars", {
      params: {
        year: 2020,
        limit: 50,
      },
      headers: {
        "X-Api-Key": "cHHHBVdIjCrDep9ciWgiNg==UDZY9HNxkh3SLXz4",
      },
    })
    .then((response) => {
      insertCarsIntoTable(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
console.info("Cars inserted.");

function createTable() {
  console.info("Creating table...");

  db.run(`CREATE TABLE IF NOT EXISTS vehicles (ID INTEGER PRIMARY KEY AUTOINCREMENT,
    city_mpg INTEGER,
    class VARCHAR(255),
    combination_mpg INTEGER,
    cylinders INTEGER,
    displacement INTEGER,
    drive VARCHAR(255),
    fuel_type VARCHAR(255),
    highway_mpg INTEGER,
    make VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    transmission VARCHAR(255),
    year INTEGER NOT NULL
    )`);

  db.run("DELETE FROM vehicles");

  console.info("Table created.");
}

function insertCarsIntoTable(response) {
  db.serialize(() => {
    const stmt = db.prepare(
      "INSERT INTO vehicles (city_mpg,class,combination_mpg,cylinders,displacement,drive,fuel_type,highway_mpg,make,model,transmission,year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
    );
    response.data.forEach((vehicle) => {
      stmt.run(...Object.values(vehicle));
    });
    stmt.finalize();
  });
}
