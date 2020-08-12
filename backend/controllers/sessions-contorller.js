const { sessionService } = require('../services');

async function handleLogin (request, response, next) {
  console.log('here')
  const { email, password } = request.body;
  try {
    const { error, user, sessionId } = await sessionService.login(email, password);
    if (error) return response.status(401).end(error);

    const oneWeek = 86400000 * 7;
    response.cookie('sessionID', sessionId, {
      maxAge: oneWeek, httpOnly: true, signed: true
    });
    response.status(201).send(user);
    console.log(`User '${user.username}' has logged in.`);
  } catch (e) {
    next(e);
  }
}

async function handleLogout (request, response, next) {
  try {
    await sessionService.logout(request.sessionId);
    response.status(204).clearCookie('sessionID').end();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  handleLogin,
  handleLogout
};
