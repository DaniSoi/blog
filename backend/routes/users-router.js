const { userController } = require('../controllers');
const { validateRegister } = require('../middleware');
const router = require('express').Router();

router.post('/', validateRegister, userController.handleRegister);

router.post('/confirmation', userController.handleUserConfirmation);

//TODO is private?
router.get('/:id', userController.handleGetUserById);

module.exports = router;
