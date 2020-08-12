import Model from "./model-local-storage.js";
import View from "../view.js";

export default class Controller {
  constructor () {
    this.model = new Model();
    this.view = new View();

    this._bindEventsToModel();
    this._bindHandlersToView();

    // render all existing postsView on load
    this.onRenderAllPosts(this.model.posts);
  }

  _bindEventsToModel () {
    this.model.bindOnRenderPosts(this.onRenderAllPosts);
    this.model.bindAddPost(this.onAddPost);
    this.model.bindSearchPost(this.onSearchPost);
  }

  _bindHandlersToView () {
    this.view.bindAddPost(this.handleAddPost);
    this.view.bindDeletePost(this.handleDeletePost);
    this.view.bindSearchPost(this.handleSearchPost);
  }

  onRenderAllPosts = posts => {
    this.view.renderPosts(posts);
  };

  onAddPost = post => {
    this.view.addPost(post);
  };

  onSearchPost = foundPosts => {
    this.view.renderFoundPosts(foundPosts);
  };

  handleAddPost = (title, body) => {
    this.model.addPost(title, body);
  };

  handleDeletePost = uid => {
    this.model.deletePost(uid);
  };

  handleSearchPost = searchRegex => {
    this.model.searchPost(searchRegex);
  };
}
