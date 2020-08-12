import { userThunks, feedThunks } from "./thunks";
import constants from "./action-types";

const { loginAction, logoutAction } = userThunks;
const {
  addPostAction,
  deletePostAction,
  editPostAction,
  fetchPostsAction } = feedThunks;

export {
  loginAction,
  logoutAction,
  addPostAction,
  deletePostAction,
  editPostAction,
  fetchPostsAction,
};

export {
  setInputValuesAction,
  clearInputFieldsAction,
  closeWritePostModalAction,
  openAddPostModalAction,
  openEditPostModalAction } from "./actions";

export const actionTypes = constants;


