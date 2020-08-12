import searchDebounce from "../feed-utils/search-debounce.js";

export default class Model {
  async fetchPosts () {
    const response = await axios.get('https://localhost:3000/posts');
    this.posts = response.data;
    this.onRenderAllPosts(this.posts);
  }

  async addPost (inputPostTitle, inputPostBody) {
    const response = await axios.post('https://localhost:3000/posts', {
      title: inputPostTitle,
      body: inputPostBody
    });

    const newPost = response.data;
    this.posts.unshift(newPost);
    this.onAddPost(newPost);
  }

  async deletePost (postId) {
    await axios.delete('https://localhost:3000/posts/' + postId);
    this.posts = this.posts.filter(({ postid }) => postid !== postId);
  }

  async editPost (inputPostTitle, inputPostBody, postId) {
    await axios.put('https://localhost:3000/posts/' + postId, {
      title: inputPostTitle,
      body: inputPostBody
    });

    const editedPost = this.posts.find(post => post.postid === postId);
    editedPost.title = inputPostTitle;
    editedPost.body = inputPostBody;
  }

  searchPost (searchRegex) {
    const debounce = searchDebounce(() => {
      if (!searchRegex) {
        this.onRenderAllPosts(this.posts);
        return;
      }

      const foundPosts = this.posts.filter(({ title, body }) =>
        (searchRegex.test(title) || searchRegex.test(body)));
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

  bindEditPost (callback) {
    this.onEditPost = callback;
  }

  bindSearchPost (callback) {
    this.onSearchPost = callback;
  }
}
