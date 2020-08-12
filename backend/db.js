const { Pool } = require('pg');

const connectionString = 'postgresql://daniel:318651643@localhost:5432/blog';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
