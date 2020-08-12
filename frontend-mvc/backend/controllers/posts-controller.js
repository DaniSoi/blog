const postService = require('../services/post-service');

async function handleGetPosts (request, response) {
  const posts = await postService.getAllPosts(request.uid);
  response.status(200).json(posts);
}

async function handleGetPostById (request, response) {
  const postId = request.params.id;
  const post = await postService.getPost(postId);
  response.status(200).json(post);
}

async function handleAddPost (request, response) {
  const { title, body } = request.body;
  const newPost = await postService.addPost(title, body, request.uid);
  response.status(201).json(newPost);
}

async function handleDeletePostById (request, response) {
  const postId = request.params.id;
  await postService.deletePost(postId);
  response.status(204).end();
}

async function handleEditPostById (request, response) {
  const postId = request.params.id;
  const { title, body } = request.body;
  await postService.editPost(title, body, postId);
  response.status(204).end();
}

module.exports = {
  handleGetPosts,
  handleGetPostById,
  handleAddPost,
  handleDeletePostById,
  handleEditPostById
};