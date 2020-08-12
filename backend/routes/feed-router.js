const postsRouter = require('./posts-router');
const { feedController } = require('../controllers');
const { authentication, uploadFile } = require('../middleware');
const router = require('express').Router();
const fs = require('fs');

router.use('/posts', postsRouter);

router.get('/image/:id', feedController.handleGetImageById);

router.get('/', authentication, feedController.handleGetFeedBySessionId)

router.get('/:uid', feedController.handleGetFeedByUid)

router.get('/:username', feedController.handleGetFeedByUsername);

router.get('/about/:uid', feedController.handleGetAboutByUid);

router.use(authentication)
      .use(uploadFile.single('img'))
      .route('/about')
      .post(feedController.handleAddAbout)
      .put(feedController.handleEditAbout);

module.exports = router;
