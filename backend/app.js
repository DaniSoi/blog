const express = require('express');
const path = require('path');
const cors = require('cors');
const { API_PREFIX, IS_PROD, COOKIE_SECRET, CLIENT_ORIGIN } = require('./config');
const routes = require('./routes');
const { errorHandler500 } = require('./middleware');
const cookieParser = require('cookie-parser');
const db = require('./db');

db.connect().catch(e => console.log('db connection error ', e));

const app = express();

app.use(
  IS_PROD ?
    express.static(path.join(__dirname, 'dist')) :
    cors({ origin: CLIENT_ORIGIN, credentials: true })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));

app.use(API_PREFIX, routes.apiRouter);

if (IS_PROD) {
  // Handles requests that don't match all of the above
  app.use('/', routes.indexRouter);
}

app.use(errorHandler500);

module.exports = app;
