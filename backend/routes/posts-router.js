const router = require('express').Router();
const { feedController } = require('../controllers');
const { authentication, uploadFile } = require('../middleware');

router.use(authentication);

router.route('/')
      .get(feedController.handleGetPosts)
      .post(uploadFile.single('img'), feedController.handleAddPost);

router.route('/:id')
      .get(feedController.handleGetPostById)
      .delete(feedController.handleDeletePostById)
      .put(uploadFile.single('img'), feedController.handleEditPostById);

module.exports = router;
