const errorHandler500 = require('./error-handler');
const authentication = require('./authentication');
const validateRegister = require('./validate-registration');
const uploadFile = require('./upload-file')

module.exports = {
  errorHandler500,
  authentication,
  validateRegister,
  uploadFile
};
