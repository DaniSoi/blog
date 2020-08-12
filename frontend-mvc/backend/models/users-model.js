const pool = require('../config/db-pool');

async function getAuthDetails(username) {
  const queryText = `SELECT uid, password FROM users
                     WHERE (username = '${username}')`;
  const results = await pool.query(queryText);

  return results.rows[0];
}

async function addUser (userDetails) {
  const { username, hashedPassword, firstName, lastName, email, bday } = userDetails;
  const queryText = `INSERT INTO users 
                    (username, password, fname, lname, email, bday)
                     VALUES ('${username}', '${hashedPassword}', '${firstName}',
                     '${lastName}', '${email}', '${bday}')`;
  await pool.query(queryText);
}

async function findUserById (uid) {
  const queryText = `SELECT username FROM users WHERE uid = '${uid}'`;
  const results = await pool.query(queryText);

  return results.rows[0].username;
}

module.exports = {
  getAuthDetails,
  addUser,
  findUserById
};