import axios from "axios";
import { API_URL } from "../config";

const FEED_URL = `${API_URL}/feed`;
const POSTS_URL = `${FEED_URL}/posts`;
const ABOUT_URL = `${FEED_URL}/about`;
const FIVE_MB = 5 * 1024 * 1024;
const config = { timeout: 10000, withCredentials: true };

export default class FeedService {
  async fetchPosts (timeout = 10000) {
    return axios.get(POSTS_URL, config);
  }

  async addPost ({ postTitleInput, postBodyInput, postImg }) {
    const fd = new FormData();
    fd.append('title', postTitleInput);
    fd.append('body', postBodyInput);
    if (postImg) fd.append('img', postImg, postImg.name);
    return axios.post(POSTS_URL, fd, config);
  }

  async deletePost (postId) {
    return axios.delete(
      `${POSTS_URL}/${postId}`,
      { withCredentials: true }
    );
  }

  async editPost ({ postTitleInput, postBodyInput, postImg }, postId) {
    const fd = new FormData();
    fd.append('title', postTitleInput);
    fd.append('body', postBodyInput);
    if (postImg) fd.append('img', postImg, postImg.name);
    return axios.put(`${POSTS_URL}/${postId}`, fd, config);
  }

  filterPosts (searchInput = '', posts = []) {
    const searchRegex = new RegExp(searchInput, 'ig');
    return posts.filter(({ title, body }) =>
      (searchRegex.test(title) || searchRegex.test(body))
    );
  }

  validatePostForm ({ postTitleInput, postBodyInput, postImg }) {
    let errors = {};

    if (!postTitleInput) {
      errors.postTitleInput = 'Post must have a title.';
    }
    if (!postBodyInput) {
      errors.postBodyInput = 'Post cannot be empty.';
    }
    if (postImg) {
      if (!postImg.type.startsWith('image'))
        errors.postImg = 'file must be an image';
      else if (postImg.size > FIVE_MB)
        errors.postImg = 'image is too big';
    }

    return errors;
  }

  async getAboutByUid (uid) {
    const reqConfig = {
      timeout: 60000,
      withCredentials: true,
      validateStatus (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    };
    return axios.get(`${ABOUT_URL}/${uid}`, reqConfig);
  }

  async saveAbout ({ aboutBodyInput, aboutImgInput, facebookLink, instagramLink, twitterLink }) {
    const fd = new FormData();
    aboutImgInput && fd.append('img', aboutImgInput, aboutImgInput.name);
    fd.append('body', aboutBodyInput);
    facebookLink && fd.append('facebookLink', facebookLink);
    instagramLink && fd.append('instagramLink', instagramLink);
    twitterLink && fd.append('twitterLink', twitterLink);
    return axios.post(ABOUT_URL, fd, config);
  }

  async editAbout ({ aboutBodyInput, aboutImgInput, facebookLink, instagramLink, twitterLink }) {
    const fd = new FormData();
    aboutImgInput && fd.append('img', aboutImgInput, aboutImgInput.name);
    aboutBodyInput && fd.append('body', aboutBodyInput);
    facebookLink && fd.append('facebookLink', facebookLink);
    instagramLink && fd.append('instagramLink', instagramLink);
    twitterLink && fd.append('twitterLink', twitterLink);
    return axios.put(ABOUT_URL, fd, config);
  }

  async getFeedByUid (uid) {
    return axios.get(`${FEED_URL}/${uid}`, config);
  }

  async getFeedByUsername (username) {
    return axios.get(`${FEED_URL}/${username}`, config);
  }

  async fetchFeed () {
    return axios.get(FEED_URL, config);
  }
}
