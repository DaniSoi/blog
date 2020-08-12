const router = require('express').Router();
const { indexController } = require('../controllers');

router.get('*', indexController.getIndex);

module.exports = router;
