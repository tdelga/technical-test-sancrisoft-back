
# Technical Test App (Backend)

This project was created as a technical test for Sancrisoft.

## Before starting the app you should:

 1. Verify that you have install Node (V16 is recommended).
 2. Execute `npm i` to install all the dependencies

## First time setup and migrations

```bash
# Before running the app for the first time, could
# create a new SQlite Database, to do that you need:
$ sqlite3 technical-test.db
$ .databases

# If you want to run the first migration you need to run:
$ npm run initial-migrate

# If you want to run the second migration you need to run
$ npm run location-vehicles-migration

# Or you could use the provided database, if you 
# choose this option, you need to have in mind that
# that db already has all the migrations and data in it.
# I dont recommend running the second script in the provided
# database, it could cause some errors.
```

## Running the app

```bash
# Build the app 
$ npm run build

# Run app in production mode. The app will run in port `8080`, you can check it in the browser
$ npm run start
