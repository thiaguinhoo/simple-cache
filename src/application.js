const express = require('express');
const database = require('./database');

const application = express();

application.get('/', async (request, response) => {
  database.all('SELECT * FROM messages', (err, rows) => {
    response.json({ data: rows });
  });
})

module.exports = application;

