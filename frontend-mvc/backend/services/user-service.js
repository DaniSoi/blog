const bcrypt = require('bcrypt');
const usersModel = require('../models/users-model');
const sessionService = require('../services/session-service');

async function login (username, password) {
  const dbAuthDetails = await usersModel.getAuthDetails(username);

  if (!dbAuthDetails) return null;

  if (!(await bcrypt.compare(password, dbAuthDetails.password)))
    return null;

  return await sessionService.createSession(dbAuthDetails.uid);
}

async function logout (token) {
  await sessionService.deleteSession(token);
}

async function register (userDetails) {
  const { password } = userDetails;
  userDetails.hashedPassword = await bcrypt.hash(password, 10);
  await usersModel.addUser(userDetails);
}

async function getUser (uid) {
  return await usersModel.findUserById(uid);
}

module.exports = {
  login,
  logout,
  register,
  getUser
};