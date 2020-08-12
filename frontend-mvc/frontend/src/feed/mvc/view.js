import createPostBox, { getChildrenOfPostBox } from "../feed-utils/create-post-box.js";
import { createElement, getElement, scrollTo } from "../../utils/utils.js";

export default class View {
  constructor () {
    this.postContainer = getElement('#postsContainer');
    this.msgContainer = getElement('#msgContainer');
    this.searchBar = getElement('#searchText');
    this.addBtn = getElement('#addBtn');
    this.writePostModal = getElement('#writePostModalWrapper');
    this.writePostModalHeader = getElement('#writePostModalTop');
    this.closeBtn = getElement('#closeBtn');
    this.writePostForm = getElement('#writePostForm');
    this.writePostSubmitBtn = getElement('#submitNewPost');
    this.postTitleBox = getElement('#newPostTitle');
    this.postBodyBox = getElement('#newPostBody');
    this.deletePostModal = getElement('#deletePostModal');
    this.deletePostModalYesBtn = getElement('#yesBtn');
    this.deletePostModalNoBtn = getElement('#noBtn');
    this.tmpTargetPost = null;

    this._setAddPostModalListeners();
    this._setDeletePostModalListeners();
    this._setEditPostModalListeners();
  }

  _setAddPostModalListeners () {
    this.addBtn.addEventListener('click', () => this._openAddPostModal());
    this.closeBtn.addEventListener('click', () => this._closeAddPostModal());
    window.addEventListener('click', (event) => {
      if (event.target === this.writePostModal) {
        this._closeAddPostModal();
      }
    });
    window.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        if (this.writePostModal.className === 'modal display') {
          this._closeAddPostModal();
        }
      }
    });
  }

  _setEditPostModalListeners () {
    this.postContainer.addEventListener('click', event => {
      if (event.target.classList.contains('edit-sign') ||
        event.target.classList.contains('edit-btn')) {
        this.tmpTargetPost = event.target.closest("article");

        const {header, paragraph} = getChildrenOfPostBox(this.tmpTargetPost);
        this._openEditPostModal({ title: header.innerText, body: paragraph.innerText });
      }
    });
  }

  _setDeletePostModalListeners () {
    this.postContainer.addEventListener('click', event => {
      if (event.target.classList.contains('trash-sign') ||
        event.target.classList.contains('trash-btn')) {
        this.tmpTargetPost = event.target.closest("article");

        this._openDeletePostModal();
      }
    });
    this.deletePostModalNoBtn.addEventListener('click', event => {
      event.preventDefault();
      this._closeDeletePostModal();
    });
    window.addEventListener('click', (event) => {
      if (event.target === this.deletePostModal) {
        this._closeDeletePostModal();
      }
    });
    window.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        if (this.deletePostModal.className === 'modal display') {
          this._closeDeletePostModal();
        }
      }
    });
  }

  renderPosts (posts) {
    this._cleanAllContainers();

    if (posts.length === 0) {
      this._addNoPostsMsg();
      return;
    }

    posts.forEach(post => {
      const postBox = createPostBox(post);
      this.postContainer.appendChild(postBox);
    });
  }

  renderFoundPosts (posts) {
    this._cleanAllContainers();

    if (!posts.length) return this._addNotFoundMsg();

    posts.forEach(post => {
      const postBox = createPostBox(post);
      markSearch(postBox, this._searchRegex);
      this.postContainer.appendChild(postBox);
    });

    scrollTo(this.searchBar);
  }

  removePost (post) {
    post.remove();

    if (isEmptyContainer(this.postContainer)) {
      this._addNoPostsMsg();
    }
  }

  addPost (post) {
    this._removeAllMsgs();

    const postBox = createPostBox(post);
    this.postContainer.insertBefore(postBox, this.postContainer.firstChild);
    _highlightPostBox(postBox);
    scrollTo(this.postContainer);
  }

  editPost (post, newTitle, newBody) {
    const {header, paragraph} = getChildrenOfPostBox(post);
    header.innerText = newTitle;
    paragraph.innerText = newBody;
  }

  get _newPostInput () {
    const inputPostTitle = this.postTitleBox.value;
    const inputPostBody = this.postBodyBox.value;

    return { title: inputPostTitle, body: inputPostBody };
  }

  get _searchRegex () {
    if (!this.searchBar.value) {
      return null;
    }

    return new RegExp(this.searchBar.value, 'ig');
  }

  _removeAllPosts () {
    cleanContainer(this.postContainer);
  }

  _removeAllMsgs () {
    cleanContainer(this.msgContainer);
  }

  _cleanAllContainers () {
    this._removeAllMsgs();
    this._removeAllPosts();
  }

  _clearPostInputFields () {
    this.postTitleBox.value = '';
    this.postBodyBox.value = '';
  }

  _openEditPostModal (oldPost) {
    this.writePostModalHeader.className = 'hide';
    this.writePostModal.className = 'modal display';
    this.writePostSubmitBtn.innerText = 'Edit';

    if (oldPost) {
      this.postTitleBox.value = oldPost.title;
      this.postBodyBox.value = oldPost.body;
    }

    this.postTitleBox.focus();
  }

  _openAddPostModal () {
    this.writePostModal.className = 'modal display';
    this.writePostModalHeader.className = 'display';
    this.writePostSubmitBtn.innerText = 'Post';
    this.postTitleBox.focus();
  }

  _closeAddPostModal () {
    this.writePostModal.className = 'modal hide';
    this._clearPostInputFields();
  }

  _openDeletePostModal () {
    this.deletePostModal.className = 'modal display';
  }

  _closeDeletePostModal () {
    this.deletePostModal.className = 'modal hide';
    this._clearPostInputFields();
  }

  _addMsg (title, body) {
    const msg = createMsgBox(title, body);
    this.msgContainer.appendChild(msg);
  }

  _addNotFoundMsg () {
    const titleText = 'Not Found.';
    const bodyText = `Try to search something else...`;

    this._addMsg(titleText, bodyText);
  }

  _addNoPostsMsg () {
    const titleText = 'No Posts Yet.';
    const bodyText = `Click the 'Add' button on the right to add new posts to your blog.`;

    this._addMsg(titleText, bodyText);
  }

  bindWritePost (addHandler, editHandler) {
    this.writePostForm.addEventListener('submit', event => {
      event.preventDefault();

      const { title, body } = this._newPostInput;
      if (!(title && body)) {
        return;
      }

      if (this.tmpTargetPost) {
        editHandler(title, body, this.tmpTargetPost.id);
        this.editPost(this.tmpTargetPost, title, body);
        this.tmpTargetPost = null;
      } else {
        addHandler(title, body);
      }

      this._closeAddPostModal();
    });
  }

  bindDeletePost (handler) {
    this.deletePostModalYesBtn.addEventListener('click', event => {
      event.preventDefault();

      const targetPostId = this.tmpTargetPost.id;
      handler(targetPostId);

      this.removePost(this.tmpTargetPost);
      this.tmpTargetPost = null;

      this._closeDeletePostModal();
    });
  }

  bindSearchPost (handler) {
    this.searchBar.addEventListener('keyup', () => {
      handler(this._searchRegex);
    });
  }
}

/******************************************************************************************************/

function _highlightPostBox (postBox) {
  postBox.className += ' highlight-new-post';

  setTimeout(() => {
    postBox.className = 'post-box';
  }, 7000);
}

function markSearch (postBox, searchRegex) {
  const replacement = match => `<span class="highlight-search">${match}</span>`;
  const {header, paragraph} = getChildrenOfPostBox(postBox);

  header.innerHTML = header.innerText.replace(searchRegex, replacement);
  paragraph.innerHTML = paragraph.innerText.replace(searchRegex, replacement);
}

function createMsgBox (titleText, bodyText) {
  const msg = createElement('div', 'msg');
  const msgHeader = createElement('h4', 'msg-title', titleText);
  const msgBody = createElement('i', 'msg-body', bodyText);

  msg.append(msgHeader, msgBody);

  return msg;
}

function cleanContainer (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function isEmptyContainer (container) {
  return container.children.length === 0;
}
