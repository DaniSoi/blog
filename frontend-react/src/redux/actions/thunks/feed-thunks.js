import C from "../action-types";
import { FeedService } from '../../../services';
import { changeFeedViewAction } from "../actions";
import views from "../feed-views";

const feedService = new FeedService();

export const fetchPostsAction = () => async dispatch => {
  dispatch(fetchPostsRequestAction());

  try {
    const response = await feedService.fetchPosts();
    const posts = response.data;
    dispatch(fetchPostsSuccessAction(posts));
  } catch (e) {
    console.log('Failed fetch posts request: ', e);
    dispatch(fetchPostsFailureAction());
  }

  function fetchPostsRequestAction () {
    return { type: C.FETCH_POSTS_REQUEST };
  }

  function fetchPostsSuccessAction (posts) {
    return {
      type: C.FETCH_POSTS_SUCCESS,
      payload: { posts }
    };
  }

  function fetchPostsFailureAction () {
    return { type: C.FETCH_POSTS_FAILURE };
  }
};

export const addPostAction = (inputs) => async dispatch => {
  dispatch(addPostRequestAction());

  try {
    const response = await feedService.addPost(inputs);
    const newPost = response.data;
    dispatch(addPostSuccessAction(newPost));
  } catch (e) {
    console.log('Failed add post request: ', e);
    dispatch(addPostFailureAction());
  }

  function addPostRequestAction () {
    return { type: C.ADD_POST_REQUEST };
  }

  function addPostSuccessAction (newPost) {
    return {
      type: C.ADD_POST_SUCCESS,
      payload: { newPost }
    };
  }

  function addPostFailureAction () {
    return { type: C.ADD_POST_FAILURE };
  }
};

export const deletePostAction = postId => async dispatch => {
  dispatch(deletePostRequestAction());

  try {
    await feedService.deletePost(postId);
    dispatch(deletePostSuccessAction(postId));
    dispatch(changeFeedViewAction(views.POSTS));
  } catch (e) {
    console.log('Failed delete post request: ', e);
    dispatch(deletePostFailureAction());
  }

  function deletePostRequestAction () {
    return { type: C.DELETE_POST_REQUEST };
  }

  function deletePostSuccessAction (postId) {
    return {
      type: C.DELETE_POST_SUCCESS,
      payload: { postId }
    };
  }

  function deletePostFailureAction () {
    return { type: C.DELETE_POST_FAILURE };
  }
};

export const editPostAction = (inputs, postId) => async dispatch => {
  dispatch(editPostRequestAction());

  try {
    const { data: editedPost } = await feedService.editPost(inputs, postId);
    dispatch(editPostSuccessAction(editedPost));
  } catch (e) {
    console.log('Failed edit post request: ', e);
    dispatch(editPostFailureAction());
  }

  function editPostRequestAction () {
    return { type: C.EDIT_POST_REQUEST };
  }

  function editPostSuccessAction (editedPost) {
    // TODO - TEMP force page reload
    //  to fetch updated post after edit
    window.location.reload(false);

    return {
      type: C.EDIT_POST_SUCCESS,
      payload: { editedPost }
    };
  }

  function editPostFailureAction () {
    return { type: C.EDIT_POST_FAILURE };
  }
};
