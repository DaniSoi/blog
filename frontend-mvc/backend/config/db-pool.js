const { Pool } = require('pg');
const settings = require('./db-settings');

const pool = new Pool(settings);

module.exports = pool;