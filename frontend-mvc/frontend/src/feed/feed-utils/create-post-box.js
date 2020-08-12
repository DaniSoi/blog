import { createElement } from "../../utils/utils.js";

export default function createPostBox ({ title, body, postid, created_at }) {
  const postBox = createElement("article", "post-box");
  postBox.id = postid;

  const separateLine = createElement('hr');

  postBox.append(createPostContent(title, body),
                 separateLine, createOptionsBar(created_at));

  return postBox;
}

function createPostContent (inputPostTitle, inputPostBody) {
  const postHeader = createElement("h3", "post-header", inputPostTitle);
  const postParagraph = createElement("p", "post-body", inputPostBody);
  const postContent = createElement("section", "post-content");

  postContent.append(postHeader, postParagraph);

  return postContent;
}

function createOptionsBar (created_at) {
  const postButtonBox = createElement("section", "btn-section");

  postButtonBox.append(createShareBtn(), createTrashBtn(), createEditBtn(), createTimestamp(created_at));

  return postButtonBox;
}

function createShareBtn () {
  const postShareBtn = createElement("button", "mdl-button share-btn");
  const postShareIcon = createElement("i", "material-icons share-sign", "share");

  postShareBtn.appendChild(postShareIcon);

  return postShareBtn;
}

function createTrashBtn () {
  const postTrashBtn = createElement("button", "mdl-button trash-btn");
  const postTrashIcon = createElement("i", "material-icons trash-sign", "delete");

  postTrashBtn.appendChild(postTrashIcon);

  return postTrashBtn;
}

function createEditBtn () {
  const postEditBtn = createElement("button", "mdl-button edit-btn");
  const postEditIcon = createElement("i", "material-icons edit-sign", "edit");

  postEditBtn.appendChild(postEditIcon);

  return postEditBtn;
}

function createTimestamp(created_at) {
  const timestamp = new Date(created_at).toLocaleString("en-US", {timeZone: "Asia/Jerusalem"});

  return createElement("i", "timestamp", timestamp);
}

export function getChildrenOfPostBox (postBox) {
  const postContent = postBox.children[0];
  const [ postTitle, postBody ] = postContent.children;

  return { header: postTitle, paragraph: postBody };
}