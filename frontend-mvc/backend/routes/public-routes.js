const staticFilesCtrl = require('../controllers/static-files-controller');
const usersCtrl =  require('../controllers/users-controller');

module.exports = (app) => {
  app.get('/', staticFilesCtrl.handleGetIndex);

  // app.get('/favicon.ico', staticFilesCtrl.handleGetFavicon);

  app.route('/login')
    .get(staticFilesCtrl.handleGetLogin)
    .post(usersCtrl.handleLogin);

  app.route('/register')
    .get(staticFilesCtrl.handleGetRegistration)
    .post(usersCtrl.handleRegister);
};