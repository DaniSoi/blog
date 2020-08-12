const { feedService } = require('../services');

async function handleGetPosts (request, response, next) {
  try {
    const posts = await feedService.getAllPostsBySession(request.sessionId);
    response.send(posts);
  } catch (e) {
    next(e);
  }
}

async function handleGetPostById (request, response, next) {
  try {
    const postId = request.params.id;
    const post = await feedService.getPostById(postId);
    response.send(post);
  } catch (e) {
    next(e);
  }
}

async function handleAddPost (request, response, next) {
  try {
    const postContent = { ...request.body, fileInfo: request.file };
    const newPost = await feedService.addPost(postContent, request.sessionId);
    response.status(201).send(newPost);
  } catch (e) {
    next(e);
  }
}

async function handleDeletePostById (request, response, next) {
  try {
    const postId = request.params.id;
    await feedService.deletePost(postId);
    response.status(204).end();
  } catch (e) {
    next(e);
  }
}

async function handleEditPostById (request, response, next) {
  try {
    const postId = request.params.id;
    const postContent = { ...request.body, fileInfo: request.file };
    const editedPost = await feedService.editPost(postContent, postId);
    response.status(201).send(editedPost);
  } catch (e) {
    next(e);
  }
}

async function handleGetFeedBySessionId (req, res, next) {
  try {
    const { error, ...feed } = await feedService.getFeedBySessionId(req.sessionId);
    if (error) return res.status(400).end(error);
    res.send(feed);
  } catch (e) {
    next(e);
  }
}

async function handleGetFeedByUid (req, res, next) {
  try {
    const { uid } = req.params;
    const { error, ...feed } = await feedService.getFeedByUid(uid);
    if (error) return res.status(400).end(error);
    res.send(feed);
  } catch (e) {
    next(e);
  }
}

async function handleGetFeedByUsername (req, res, next) {
  try {
    const { username } = req.params;
    const { error, ...feed } = await feedService.getFeedByUsername(username);
    if (error) return res.status(400).end(error);
    res.send(feed);
  } catch (e) {
    next(e);
  }
}

async function handleGetAboutByUid (req, res, next) {
  try {
    const { uid } = req.params;
    const { error, ...aboutInfo } = await feedService.getAboutByUid(uid);
    if (error) return res.status(400).end(error);
    res.send(aboutInfo);
  } catch (e) {
    next(e);
  }
}

async function handleAddAbout (req, res, next) {
  try {
    const aboutInputs = { ...req.body, imgFileData: req.file };
    const { uid, ...aboutContent } = await feedService.addAbout(aboutInputs, req.sessionId);
    res.send({ aboutContent, uid });
  } catch (e) {
    next(e);
  }
}

async function handleEditAbout (req, res, next) {
  try {
    const aboutInputs = { ...req.body, imgFileData: req.file };
    const result = await feedService.editAbout(aboutInputs, req.sessionId);
    if (!result) return res.status(400).end(result);
    const { uid, ...aboutContent } = result;
    res.send({ aboutContent, uid });
  } catch (e) {
    next(e);
  }
}

async function handleGetImageById (req, res, next) {
  try {
    const { id } = req.params;
    const { error, content, contentType } = await feedService.getImageById(id);
    if (error) return res.status(400).end(error);

    res.contentType(contentType);
    res.send(content);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  handleGetPosts,
  handleGetPostById,
  handleAddPost,
  handleDeletePostById,
  handleEditPostById,
  handleGetFeedByUsername,
  handleGetFeedBySessionId,
  handleGetFeedByUid,
  handleGetAboutByUid,
  handleAddAbout,
  handleEditAbout,
  handleGetImageById
};
