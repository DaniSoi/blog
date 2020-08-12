const userService = require('../services/user-service');

async function handleLogin (request, response) {
  const { username, password } = request.body;
  console.log('try login', username, password)
  const token = await userService.login(username, password);

  if (!token) {
    console.log('auth fail')
    response.status(401).end();
    return;
  }

  const oneDay = 86400000;
  response.cookie('token', token, {
     maxAge: oneDay, httpOnly: true, secure: true, signed: true
  });
  response.status(201).end();

  console.log(`User '${username}' has logged in.`);
}

async function handleLogout (request, response) {
  await userService.logout(request.token);
  response.status(204).clearCookie('token').end();

  console.log(`User ${request.uid} has logged out.`);
}

async function handleRegister (request, response) {
  console.log('try register')
  const userDetails = request.body;
  await userService.register(userDetails);
  await handleLogin(request, response); // login after sign up
}

async function handleGetUserById (request, response) {
  const uid = parseInt(request.params.id);
  const username = await userService.getUser(uid);
  response.status(200).json(username);
}

module.exports = {
  handleLogin,
  handleLogout,
  handleRegister,
  handleGetUserById
};