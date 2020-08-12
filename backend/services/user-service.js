const { createConfirmHTML } = require("../utils");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { userModel } = require('../models');
const { SMTP_USER, CLIENT_ORIGIN } = require('../config');
const emailService = require('./email-service');

async function register (userDetails) {
  const { password, firstName, email } = userDetails;
  try {
    userDetails.password = await bcrypt.hash(password, 10);
    const uid = await userModel.addUser(userDetails);
    if (!uid) return { error: 'EMAIL_EXISTS' };
    const token = crypto.randomBytes(10).toString('hex');
    await userModel.saveVerifyToken(token, uid);
    await sendConfirmEmail(email, firstName, token);
    return {};
  } catch (e) {
    console.log('user service - password hashing error');
    throw e;
  }
}

async function sendConfirmEmail (email, firstName, token) {
  const confirmUrl = `${CLIENT_ORIGIN}/confirm/${token}`;
  const emailTemplate = {
    from: SMTP_USER,
    to: email,
    subject: 'RE: Confirm your new account in Blog',
    html: createConfirmHTML(token, firstName, confirmUrl),
    text: `Please verify your account:\n${confirmUrl}`
  };
  return emailService.sendEmail(emailTemplate);
}

async function confirmUser (token) {
  try {
    const uid = await userModel.findUidByVerifyToken(token);
    if (!uid) return false;
    return userModel.confirmUser(uid);
  } catch (e) {
    console.log('user service - password hashing error');
    throw e;
  }
}

async function getUserById (uid) {
  return userModel.findUserById(uid);
}

async function getIdByUsername (username) {
  return userModel.findUidByUsername(username);
}

module.exports = {
  register,
  getUserById,
  confirmUser,
  getIdByUsername
};
