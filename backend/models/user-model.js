// const pool = require('../config/db-pool');
const db = require('../db');

const UNIQUE_VIOLATION = '23505';

async function getAuthDetails (email) {
  const queryText = `SELECT uid, username, password, "isVerified" FROM users
                     WHERE (email = '${email}')`;
  try {
    const results = await db.query(queryText);
    return results.rows[0];
  } catch (e) {
    console.log('db error - user model - rethrowing');
    throw e;
  }
}

async function addUser ({
                          username,
                          password,
                          firstName,
                          lastName,
                          email,
                          bday
                        }) {
  const queryText = `INSERT INTO users 
                    (username, password, "firstName", "lastName", email, bday)
                     VALUES ('${username}', '${password}', '${firstName}',
                     '${lastName}', '${email}', '${bday}')
                     RETURNING uid`;
  try {
    const { rows } = await db.query(queryText);
    return rows[0].uid;
  } catch (e) {
    if (e.code === UNIQUE_VIOLATION) return false;

    console.log('db error - user model addUser - rethrowing');
    throw e;
  }
}

async function saveVerifyToken (token, uid) {
  const queryText = `INSERT INTO verify_tokens (token, uid)
                     VALUES ('${token}', ${uid})`;
  try {
    await db.query(queryText);
  } catch (e) {
    console.log('db error - user model saveVerifyToken - rethrowing');
    throw e;
  }
}

async function findUserById (uid) {
  const queryText = `SELECT username FROM users WHERE uid = '${uid}'`;
  try {
    const { rows, rowCount } = await db.query(queryText);
    if (!rowCount) return null;
    return rows[0].username;
  } catch (e) {
    console.log('db error - user model - rethrowing');
    throw e;
  }
}

async function findUidByVerifyToken (token) {
  const queryText = `SELECT uid FROM verify_tokens 
                     WHERE token = '${token}'`;
  try {
    const { rows, rowCount } = await db.query(queryText);
    if (!rowCount) return null;
    return rows[0].uid;
  } catch (e) {
    console.log('db error - user model - rethrowing');
    throw e;
  }
}

async function findUidByUsername (username) {
  const queryText = `SELECT uid FROM users 
                     WHERE username = '${username}'`;
  try {
    const { rows, rowCount } = await db.query(queryText);
    if (!rowCount) return null;
    return rows[0].uid;
  } catch (e) {
    console.log('db error - user model - rethrowing');
    throw e;
  }
}

async function confirmUser (uid) {
  const queryText = `UPDATE users SET "isVerified" = true WHERE uid = ${uid}`;
  try {
    const { rowCount } = await db.query(queryText);
    return rowCount > 0;
  } catch (e) {
    console.log('db error - user model - rethrowing');
    throw e;
  }
}

module.exports = {
  getAuthDetails,
  addUser,
  findUserById,
  findUidByUsername,
  findUidByVerifyToken,
  confirmUser,
  saveVerifyToken
};
