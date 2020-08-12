function authentication(req, res, next) {
  const { sessionID } = req.signedCookies;
  if (!sessionID) {
    console.log('auth fail - invalid session cookie');
    return res.status(401).end();
  }

  req.sessionId = sessionID;
  next();
}

module.exports = authentication;
