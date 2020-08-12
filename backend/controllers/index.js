const feedController = require('./feed-controller');
const userController = require('./users-controller');
const sessionController = require('./sessions-contorller');
const indexController = require('./index-controller');

module.exports = {
  sessionController,
  feedController,
  userController,
  indexController
};
