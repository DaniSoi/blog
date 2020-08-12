const sessionService = require('../services/session-service');

function errorHandler(err, req, res, next) {
  console.log(err.stack);
  res.status(500).end('Unable to process request...');
}

async function authentication(req, res, next) {
  const { token } = req.signedCookies;
  console.log('token', token);

  if (!token) {
    console.log('auth fail 1');
    res.status(403).end();
    return;
  }

  const uid = await sessionService.getUid(token);

  // check if the token was correct
  if (uid) {
    req.token = token;
    req.uid = uid;
    next();
  } else {
    console.log('auth fail 2');
    res.status(403).end();
  }
}

module.exports = {
  errorHandler,
  authentication
};