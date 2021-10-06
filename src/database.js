const path = require('path');
const sqlite = require('sqlite3');

const databaseFilename = path.resolve(__dirname, '../data.sqlite');

const database = new sqlite.Database(databaseFilename);

database.run(`
  CREATE TABLE IF NOT EXISTS messages (
    content TEXT NOT NULL
  )
`)

module.exports = database;

