
# Technical Test App (Backend)

This project was created as a technical test for Sancrisoft.

## Before starting the app you should:

 1. Verify that you have installed Node (V16 is recommended).
 2. Execute `npm i` to install all the dependencies

## First-time setup and migrations

```bash
# You have two options, the first one is using the provided
# database, or you could create your own one.
# The database provided already has all the migrations and data in it.
# I don't recommend running the second script in the provided
# database, it could cause some errors.

# If you decide to create your own database,
# Before running the app for the first time, you need to
# create a new SQLite Database, to do that you need:
$ sqlite3 technical-test.db
$ .databases

# If you want to run the first migration you need to run:
$ npm run initial-migrate

# If you want to run the second migration you need to run
$ npm run location-vehicles-migration
```

## Running the app

```bash
# Build the app 
$ npm run build

# Run app in production mode. The app will run on port `8080`, you can check it in the browser
$ npm run start
