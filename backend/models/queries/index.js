function createGetAboutByUidQuery (uid) {
  return `SELECT body, "imgId", "facebookLink", "instagramLink", "twitterLink"
          FROM users_about WHERE uid = ${uid}`;
}

//TODO fix saving of links as 'undefined' strings

function createSaveAboutQuery ({
                                 body,
                                 imgId = null,
                                 facebookLink = null,
                                 instagramLink = null,
                                 twitterLink = null
                               }, sessionId) {
  const query = 'INSERT INTO users_about ' +
    '(body, "imgId", "facebookLink", "instagramLink", "twitterLink", uid) ' +
    'SELECT $1, $2, $3, $4, $5, uid ' +
    'FROM sessions WHERE "sessionId" = $6 ' +
    'RETURNING body, "imgId", "facebookLink", "instagramLink", "twitterLink", uid';
  const params = [body, imgId, facebookLink, instagramLink, twitterLink, sessionId];
  return [query, params];
}

function createEditAboutQuery ({
                                 body,
                                 imgId = null,
                                 facebookLink = null,
                                 instagramLink = null,
                                 twitterLink = null
                               }, sessionId) {
  console.log(typeof body)
  const query = 'UPDATE users_about SET ' +
    'body = COALESCE($1, body), ' +
  '"imgId" = COALESCE($2, "imgId"), ' +
  '"facebookLink" = COALESCE($3, "facebookLink"), ' +
  '"instagramLink" = COALESCE($4, "instagramLink"), ' +
  '"twitterLink" = COALESCE($5, "twitterLink") ' +
  'WHERE uid in (SELECT uid FROM sessions WHERE "sessionId" = $6) ' +
  // 'AND ($1 IS NOT NULL AND $1 IS DISTINCT FROM body OR ' +
  // '$2 IS NOT NULL AND $2 IS DISTINCT FROM "imgId" OR ' +
  // '$3 IS NOT NULL AND $3 IS DISTINCT FROM "facebookLink" OR ' +
  // '$4 IS NOT NULL AND $4 IS DISTINCT FROM "instagramLink" OR ' +
  // '$5 IS NOT NULL AND $5 IS DISTINCT FROM "twitterLink") ' +
  'RETURNING uid, body, "imgId", "facebookLink", "instagramLink", "twitterLink"';
  console.log(query)
  const params = [body, imgId, facebookLink, instagramLink, twitterLink, sessionId];
  return [query, params];
}

module.exports = {
  createGetAboutByUidQuery,
  createSaveAboutQuery,
  createEditAboutQuery
}

