const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const middleware = require('./middleware');
const { publicRoutes, privateRoutes } = require('./routes');

const CLIENT_DIR = path.join(__dirname, '../frontend/src');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://localhost:3000'],
  credentials: true,
}));
app.use(express.static(CLIENT_DIR));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser('My secret signature for cookies'));

publicRoutes(app);

app.use(middleware.authentication);

privateRoutes(app);

app.use(middleware.errorHandler);

module.exports = app;