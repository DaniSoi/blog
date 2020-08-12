const fs = require('fs');
const util = require('util');
const { feedModel, userModel, sessionModel } = require('../models');

async function getAllPostsBySession (sessionId) {
  return feedModel.getAllPostsBySession(sessionId);
}

async function getPostById (postId) {
  return feedModel.getPostById(postId);
}

async function addPost (postContent, sessionId) {
  postContent.imgId = await saveImage(postContent.fileInfo);
  return feedModel.addPost(postContent, sessionId);
}

async function deletePost (postId) {
  return feedModel.deletePostById(postId);
}

async function editPost (postContent, postId) {
  postContent.imgId = await saveImage(postContent.fileInfo);
  return feedModel.editPostById(postContent, postId);
}

async function getFeedBySessionId (sessionId) {
  try {
    const uid = await sessionModel.getUidBySessionId(sessionId);
    if (!uid) return { error: 'Session not found' };

    return getFeedByUid(uid);
  } catch (e) {
    console.log('feed service error - rethrowing');
    throw e;
  }
}

async function getFeedByUsername (username) {
  try {
    const uid = await userModel.findUidByUsername(username);
    if (!uid) return { error: 'User not found' };

    return getFeedByUid(uid);
  } catch (e) {
    console.log('feed service error - rethrowing');
    throw e;
  }
}

async function getFeedByUid (uid) {
  try {
    const [ latestPosts, aboutSection ] = await Promise.all([
      feedModel.getLatestPostsByUid(uid),
      feedModel.getUsersAboutByUid(uid)
    ]);

    // if about not found, uid is wrong
    // if (!aboutSection) return { error: 'Uid not found' };

    return { latestPosts, aboutSection, uid };
  } catch (e) {
    console.log('feed service error - rethrowing');
    throw e;
  }
}

async function getAboutByUid (uid) {
  const aboutContent = await feedModel.getUsersAboutByUid(uid);
  if (!aboutContent) return { error: 'User not found' };

  return { aboutContent, uid };
}

async function addAbout (aboutInputs, sessionId) {
  aboutInputs.imgId = await saveImage(aboutInputs.imgFileData);
  return feedModel.saveAbout(aboutInputs, sessionId);
}

async function editAbout (aboutInputs, sessionId) {
  aboutInputs.imgId = await saveImage(aboutInputs.imgFileData);
  return feedModel.editAbout(aboutInputs, sessionId);
}

async function getImageById (id) {
  try {
    const imgData = await feedModel.getImageById(id);
    if (!imgData) return { error: 'image not found' };
    return { ...imgData };
  } catch (e) {
    console.log('feed service error - getImageById - rethrowing', e);
    throw e;
  }
}

async function saveImage (fileInfo) {
  if (!fileInfo) return;

  try {
    const imgBuffer = await readImageFile(fileInfo.path);
    return feedModel.saveImage(imgBuffer, fileInfo.mimetype);
  } catch (e) {
    console.log('feed service error - saveImage - rethrowing', e);
    throw e;
  }
}

async function readImageFile () {
  const readFilePromise = util.promisify(fs.readFile);
  return readFilePromise(...arguments);
}

module.exports = {
  getFeedByUid,
  getFeedBySessionId,
  getFeedByUsername,
  getAboutByUid,
  addAbout,
  editAbout,
  getAllPostsBySession,
  getPostById,
  addPost,
  deletePost,
  editPost,
  getImageById,
  saveImage
};
