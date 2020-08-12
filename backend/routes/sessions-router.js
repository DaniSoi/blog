const router = require('express').Router();
const { sessionController } = require('../controllers');
const { authentication } = require('../middleware');

router.route('/')
   .post(sessionController.handleLogin)
   .delete(authentication, sessionController.handleLogout);

module.exports = router;
