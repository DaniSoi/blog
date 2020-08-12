// const pool = require('../config/db-pool');
const db = require('../db');
const queries = require('./queries');

async function getAllPostsBySession (sessionId) {
  const queryText = `SELECT title, body, id, "imgId", "createdAt" FROM posts 
                     WHERE uid IN 
                     (SELECT uid FROM sessions WHERE "sessionId" = '${sessionId}')
                     ORDER BY "createdAt" DESC`;
  try {
    const results = await db.query(queryText);
    return results.rows;
  } catch (e) {
    console.log('db error - feed model - rethrowing');
    throw e;
  }
}

async function getLatestPostsByUid (uid) {
  const queryText = `SELECT title, body, id, "imgId", "createdAt" FROM posts 
                     WHERE uid = ${uid}
                     ORDER BY "createdAt" DESC
                     LIMIT 5`;
  try {
    const results = await db.query(queryText);
    return results.rows;
  } catch (e) {
    console.log('db error - feed model (getLatestPostsByUid) - rethrowing');
    throw e;
  }
}

async function getUsersAboutByUid (uid) {
  try {
    const results = await db.query(
      queries.createGetAboutByUidQuery(uid)
    );
    return results.rows[0];
  } catch (e) {
    console.log('db error - feed model (getUsersAboutByUid) - rethrowing');
    throw e;
  }
}

async function saveAbout (aboutContent, sessionId) {
  try {
    const results = await db.query(
      ...queries.createSaveAboutQuery(aboutContent, sessionId)
    );
    return results.rows[0];
  } catch (e) {
    console.log('db error - feed model - rethrowing');
    throw e;
  }
}

async function editAbout (aboutContent, sessionId) {
  // const queryText = imgId ?
  //   `UPDATE users_about SET body = '${body}', "imgId" = ${imgId}
  //   WHERE uid IN
  //   (SELECT uid FROM sessions WHERE "sessionId" = '${sessionId}')
  //   RETURNING body, "imgId"`
  //   :
  //   `UPDATE posts SET body = '${body}'
  //    WHERE uid IN
  //   (SELECT uid FROM sessions WHERE "sessionId" = '${sessionId}')
  //   RETURNING body, "imgId"`;
  // queryText = 'UPDATE posts SET body = $1, imgId = $2 ' +
  //   'WHERE uid = $3 ' +
  //   'RETURNING body, imgId';

  try {
    const results = await db.query(
      ...queries.createEditAboutQuery(aboutContent, sessionId)
    );
    console.log('edited: ', results.rowCount)
    return results.rows[0];
  } catch (e) {
    console.log('db error - feed model (editAbout) - rethrowing');
    throw e;
  }
}

async function getPostById (postId) {
  const queryText = `SELECT title, body, "imgId", id, "createdAt"
                     FROM posts WHERE id = '${postId}'`;
  try {
    const results = await db.query(queryText);
    console.log(`Found ${results.rowCount} posts`);
    return results.rows[0];
  } catch (e) {
    console.log('db error - feed model - rethrowing');
    throw e;
  }
}

async function addPost ({ title, body, imgId = null }, sessionId) {
  const queryText = 'INSERT INTO posts (title, body, "imgId", uid) ' +
                    'SELECT $1, $2, $3, uid FROM sessions ' +
                    'WHERE "sessionId" = $4 ' +
                    'RETURNING title, body, id, "imgId", "createdAt"';
  const params = [title, body, imgId, sessionId];
  try {
    const results = await db.query(queryText, params);
    console.log(`Added ${results.rowCount} posts`);
    return results.rows[0];
  } catch (e) {
    console.log('db error - feed model (add post) - rethrowing', e);
    throw e;
  }
}

async function deletePostById (postId) {
  const queryText = `DELETE FROM posts WHERE id = '${postId}'`;
  try {
    const results = await db.query(queryText);
    console.log(`Deleted ${results.rowCount} posts`);
  } catch (e) {
    console.log('db error - feed model - rethrowing');
    throw e;
  }
}

async function editPostById ({ title, body, imgId }, postId) {
  const queryText = imgId ?
    `UPDATE posts SET title = '${title}', body = '${body}', "imgId" = ${imgId}
     WHERE id = ${postId} RETURNING title, body, "imgId", id, "createdAt"`
    :
    `UPDATE posts SET title = '${title}', body = '${body}' 
     WHERE id = ${postId} RETURNING title, body, "imgId", id, "createdAt"`
  ;

  try {
    const results = await db.query(queryText);
    console.log(`Edited ${results.rowCount} posts`);
    return results.rows[0];
  } catch (e) {
    console.log('db error - feed model - rethrowing');
    throw e;
  }
}

async function saveImage (imgContent, contentType) {
  const queryText = 'INSERT INTO images (content, "contentType") ' +
    'VALUES ($1, $2) RETURNING id';
  try {
    const results = await db.query(queryText, [ imgContent, contentType ]);
    return results.rows[0].id;
  } catch (e) {
    console.log('db error - feed model - rethrowing');
    throw e;
  }
}

async function getImageById (id) {
  const queryText = `SELECT content, "contentType" FROM images WHERE id = ${id}`;
  try {
    const results = await db.query(queryText);
    return results.rows[0];
  } catch (e) {
    console.log('db error - feed model - rethrowing');
    throw e;
  }
}

module.exports = {
  getAllPostsBySession,
  getLatestPostsByUid,
  getUsersAboutByUid,
  saveAbout,
  editAbout,
  getPostById,
  addPost,
  deletePostById,
  editPostById,
  getImageById,
  saveImage
};
