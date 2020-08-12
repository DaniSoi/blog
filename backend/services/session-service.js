const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { sessionModel, userModel } = require('../models');

async function login (email, password) {
  try {
    const { error, user } = await validateUser(email, password);
    if (error) return { error };
    const sessionId = await createSession(user.uid);
    return { user, sessionId };
  } catch (e) {
    console.log('session service error - rethrowing')
    throw e;
  }
}

async function validateUser (email, password) {
  const authInfo = await userModel.getAuthDetails(email);
  if (!authInfo) return { error: 'incorrect email' };

  const { password: hashedPass, isVerified, ...user } = authInfo;
  if (!isVerified) return { error: 'unverified user' };

  if (!(await bcrypt.compare(password, hashedPass)))
    return { error: 'incorrect password' };

  return { user };
}

async function createSession (uid) {
  try {
    const sessionId = crypto.randomBytes(16).toString('base64');
    await sessionModel.addSession(uid, sessionId);
    return sessionId;
  } catch (e) {
    console.log('sessions service error - rethrowing');
    throw e;
  }
}

async function logout (sessionId) {
  return sessionModel.deleteSession(sessionId);
}

module.exports = {
  login,
  logout
};
