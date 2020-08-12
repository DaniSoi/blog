const pool = require('../config/db-pool');

async function addRecord (uid, token) {
  const queryText = `INSERT INTO sessions (uid, token) VALUES (${uid}, '${token}')`;
  await pool.query(queryText);
}

async function deleteRecord (token) {
  const queryText = `DELETE FROM sessions WHERE token = '${token}'`;
  await pool.query(queryText);
}

async function findUidByToken (token) {
  const queryText = `SELECT uid FROM sessions WHERE token = '${token}'`;
  const results = await pool.query(queryText);
  return results.rows[0].uid;
}

module.exports = {
  addRecord,
  deleteRecord,
  findUidByToken
};