const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();
const { faker } = require("@faker-js/faker");
let db = new sqlite3.Database("./technical-test.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
});
console.info("Connected to the SQlite database.");
db.run("DELETE FROM vehicles");
addLocationColumn();

console.log("Inserting cars...");
for (let i = 0; i <= 20; i++) {
  const year = "20" + i.toString().padStart(2, "0");
  axios
    .get("https://api.api-ninjas.com/v1/cars", {
      params: {
        year: year,
        limit: 10,
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

function insertCarsIntoTable(response) {
  response.data.forEach((vehicle) => {
    insertVehicle(vehicle);
  });
}

function insertVehicle(vehicle) {
  axios
    .get("https://api.api-ninjas.com/v1/zipcode", {
      params: {
        state: faker.location.state({ abbreviated: true }),
      },
      headers: {
        "X-Api-Key": "cHHHBVdIjCrDep9ciWgiNg==UDZY9HNxkh3SLXz4",
      },
    })
    .then((response) => {
      vehicle.year += 2;
      vehicle.location = `${response.data[0].country}, ${response.data[0].state}, ${response.data[0].city}`;
      let stmt = db.prepare(
        "INSERT INTO vehicles (city_mpg,class,combination_mpg,cylinders,displacement,drive,fuel_type,highway_mpg,make,model,transmission,year,location) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
      );
      stmt.run(...Object.values(vehicle));
    })
    .catch((error) => {
      console.log(error);
    });
}

function addLocationColumn() {
  //db.run("ALTER TABLE vehicles ADD COLUMN location VARCHAR(255)");
  console.info("Location column added.");
}
