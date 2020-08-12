const userCtrl =  require('../controllers/users-controller');
const postCtrl = require('../controllers/posts-controller');
const staticFilesCtrl = require('../controllers/static-files-controller');

module.exports = (app) => {
  app.post('/logout', userCtrl.handleLogout);

  app.get('/postsView', staticFilesCtrl.handleGetFeed);

  app.get('/users/:id', userCtrl.handleGetUserById);

  app.route('/postsView')
    .get(postCtrl.handleGetPosts)
    .post(postCtrl.handleAddPost);

  app.route('/postsView/:id')
    .get(postCtrl.handleGetPostById)
    .delete(postCtrl.handleDeletePostById)
    .put(postCtrl.handleEditPostById);
};
