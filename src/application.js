const express = require('express');
const morgan = require('morgan');
const database = require('./database');
const cache = require('./utils/cache');

const application = express();
if (process.env.NODE_ENV === 'development') {
  application.use(morgan('tiny'));
}

application.get('/', async (request, response) => {
  const key = '__express__' + request.url || request.originalUrl;
  const cached = cache.get(key);
  if (cached === undefined) {
    database.all('SELECT * FROM messages', (err, rows) => {
      cache.set(key, { data: rows });
      response.json({ data: rows });
    });
  } else {
    response.json(cached);
  }
})

module.exports = application;

