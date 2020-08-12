const crypto = require('crypto');
const sessionModel = require('../models/sessions-model');

async function createSession (uid) {
  const token = crypto.randomBytes(16).toString('base64');
  await sessionModel.addRecord(uid, token);

  return token;
}

async function deleteSession (token) {
  await sessionModel.deleteRecord(token);
}

async function getUid (token) {
  return await sessionModel.findUidByToken(token);
}

module.exports = {
  createSession,
  deleteSession,
  getUid
};