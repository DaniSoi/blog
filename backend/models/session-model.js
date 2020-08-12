// const pool = require('../config/db-pool');
const db = require('../db');

async function addSession (uid, sessionId) {
  const queryText = `INSERT INTO sessions (uid, "sessionId") 
                     VALUES (${uid}, '${sessionId}')`;
  try {
    const results = await db.query(queryText);
    console.log(`Added ${results.rowCount} session`);
  } catch (e) {
    console.log('db error - session model - rethrowing');
    throw e;
  }
}

async function deleteSession (sessionId) {
  const queryText = `DELETE FROM sessions WHERE "sessionId" = '${sessionId}'`;
  try {
    const results = await db.query(queryText);
    console.log(`Deleted ${results.rowCount} session`);
  } catch (e) {
    console.log('db error - session model - rethrowing');
    throw e;
  }
}

async function getUidBySessionId (sessionId) {
  const queryText = `SELECT uid FROM sessions WHERE "sessionId" = '${sessionId}'`;
  try {
    const results = await db.query(queryText);
    if (!results.rowCount) return null;

    return results.rows[0].uid;
  } catch (e) {
    console.log('db error - session model - rethrowing');
    throw e;
  }
}

module.exports = {
  addSession,
  deleteSession,
  getUidBySessionId
};
