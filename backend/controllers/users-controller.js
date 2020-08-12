const { userService } = require('../services');

async function handleRegister (request, response, next) {
  try {
    const userDetails = request.body;
    // check if registration successful (no duplicates)
    const { error } = await userService.register(userDetails);
    if (error) {
      response.set('X-Status-Reason', error);
      return response.status(409).end(error);
    }

    response.status(201).end();
  } catch (e) {
    next(e);
  }
}

async function handleGetUserById (request, response, next) {
  try {
    const uid = parseInt(request.params.id);
    const username = await userService.getUserById(uid);
    response.send(username);
  } catch (e) {
    next(e);
  }
}

async function handleUserConfirmation (request, response, next) {
  try {
    const { token } = request.body;
    console.log('token: ', token);
    const isVerified = await userService.confirmUser(token);
    if (!isVerified) return response.status(400).end('invalid token');
    response.status(201).end();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  handleRegister,
  handleGetUserById,
  handleUserConfirmation
};
