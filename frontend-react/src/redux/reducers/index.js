import { combineReducers } from 'redux'
import feed from "./feed";
import postsView from "./posts-view";
import authentication from "./authentication";
import writePostModal from "./writePostModal";

export default combineReducers({
  feed,
  postsView,
  authentication,
  writePostModal
});
