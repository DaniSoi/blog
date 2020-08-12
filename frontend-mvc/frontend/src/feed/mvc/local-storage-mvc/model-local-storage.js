import generateUid from "../../feed-utils/uid.js";
import searchDebounce from "../../feed-utils/search-debounce.js";

export default class Model {
  constructor () {
    this.posts = JSON.parse(localStorage.getItem('posts')) || [];
  }

  _commitPosts (posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  addPost (inputPostTitle, inputPostBody) {
    const newPost = {title: inputPostTitle, body: inputPostBody, uid: generateUid()};

    // unshift so that new postsView will appear on top
    this.posts.unshift(newPost);
    this._commitPosts(this.posts);
    this.onAddPost(newPost);
  }

  deletePost (uid) {
    this.posts = this.posts.filter(post => (post.uid !== uid));

    this._commitPosts(this.posts);
  }

  searchPost (searchRegex) {
    const debounce = searchDebounce(() => {
      const foundPosts = this.posts.filter( ({title, body}) => (searchRegex.test(title) || searchRegex.test(body)) );
      this.onSearchPost(foundPosts);
    }, 250);

    debounce();
  }

  bindOnRenderPosts (callback) {
    this.onRenderAllPosts = callback;
  }

  bindAddPost (callback) {
    this.onAddPost = callback;
  }

  bindSearchPost (callback) {
    this.onSearchPost = callback;
  }
}
