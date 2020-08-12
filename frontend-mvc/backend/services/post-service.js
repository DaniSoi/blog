const uuid = require('uuid');
// const crypto = require('crypto');
const postModel = require('../models/posts-model');

async function getAllPosts (uid) {
  return await postModel.findPostsByUid(uid);
}

async function getPost (postId) {
  /*TODO check if post exists before returning*/
  return await postModel.findPost(postId);
}

async function addPost (title, body, uid) {
  // const postId = await crypto.randomBytes(8).toString('hex');
  const postId = uuid.v4();
  await postModel.addPost(title, body, postId, uid);

  return { title, body, postid: postId, created_at: new Date().getTime() };
}

async function deletePost (postId) {
  await postModel.deletePostById(postId);
}

async function editPost(title, body, postId) {
  await postModel.editPostById(title, body, postId);
}

module.exports = {
  getAllPosts,
  getPost,
  addPost,
  deletePost,
  editPost
};