import Model from "./model.js";
import View from "./view.js";

export default class Controller {
  constructor () {
    this.model = new Model();
    this.view = new View();

    this._bindEventsToModel();
    this._bindHandlersToView();

    this.onload()
      .catch(reason => console.log(reason));
  }

  async onload () {
    // fetch all user's postsView and render them on load
    await this.model.fetchPosts();
  }

  _bindEventsToModel () {
    this.model.bindOnRenderPosts(this.onRenderAllPosts);
    this.model.bindAddPost(this.onAddPost);
    this.model.bindEditPost(this.onEditPost);
    this.model.bindSearchPost(this.onSearchPost);
  }

  _bindHandlersToView () {
    this.view.bindWritePost(this.handleAddPost, this.handleEditPost);
    this.view.bindDeletePost(this.handleDeletePost);
    this.view.bindSearchPost(this.handleSearchPost);
  }

  onRenderAllPosts = posts => {
    this.view.renderPosts(posts);
  };

  onAddPost = post => {
    this.view.addPost(post);
  };

  onEditPost = post => {
    this.view.editPost(post);
  };

  onSearchPost = foundPosts => {
    this.view.renderFoundPosts(foundPosts);
  };

  handleAddPost = (title, body) => {
    this.model.addPost(title, body)
      .catch(reason => console.log(reason));
  };

  handleEditPost = (title, body, postId) => {
    this.model.editPost(title, body, postId)
      .catch(reason => console.log(reason));
  };

  handleDeletePost = uid => {
    this.model.deletePost(uid)
      .catch(reason => console.log(reason));
  };

  handleSearchPost = searchRegex => {
    this.model.searchPost(searchRegex);
  };
}
