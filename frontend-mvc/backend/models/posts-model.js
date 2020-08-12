const pool = require('../config/db-pool');

async function findPostsByUid (uid) {
  const queryText = `SELECT title, body, postId, created_at FROM posts 
                     WHERE uid = ${uid} ORDER BY created_at DESC`;
  const results = await pool.query(queryText);

  return results.rows;
}

async function findPost (postId) {
  const queryText = `SELECT title, body, postId FROM posts WHERE postId = '${postId}'`;
  const results = await pool.query(queryText);
  console.log(`Found ${results.rowCount} posts`);

  return results.rows[0];
}

async function addPost (title, body, postId, uid) {
  const queryText = `INSERT INTO posts (title, body, postId, uid)
                     VALUES ('${title}', '${body}', '${postId}', ${uid})`;
  const results = await pool.query(queryText);
  console.log(`Added ${results.rowCount} posts`);
}

async function deletePostById (postId) {
  const queryText = `DELETE FROM posts WHERE postId = '${postId}'`;
  const results = await pool.query(queryText);
  console.log(`Deleted ${results.rowCount} posts`);
}

async function editPostById (title, body, postId) {
  const queryText = `UPDATE posts SET title = '${title}', body = '${body}'
                     WHERE postId = '${postId}'`;
  const results = await pool.query(queryText);
  console.log(`Edited ${results.rowCount} posts`);
}

module.exports = {
  findPostsByUid,
  findPost,
  addPost,
  deletePostById,
  editPostById
};