import { actionTypes as C } from "../actions";

const initialState = {
  posts: [],
  isLoading: false,
  error: false
};

export default function postsView (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case C.FETCH_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case C.FETCH_POSTS_SUCCESS:
      return {
        posts: [...payload.posts],
        isLoading: false,
        error: false
      };
    case C.FETCH_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case C.ADD_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case C.ADD_POST_SUCCESS:
      return {
        posts: [ post({}, action), ...state.posts ],
        isLoading: false,
        error: false
      };
    case C.ADD_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case C.EDIT_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case C.EDIT_POST_SUCCESS:
      return {
        posts: state.posts.map(p => post(p, action)),
        isLoading: false,
        error: false
      };
    case C.EDIT_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case C.DELETE_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case C.DELETE_POST_SUCCESS:
      return {
        posts: state.posts.filter(p => p.id !== payload.postId),
        isLoading: false,
        error: false
      };
    case C.DELETE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
}

function post (state = {}, { type, payload }) {
  switch (type) {
    case C.ADD_POST_SUCCESS:
      console.log(payload.newPost)
      return {
        ...payload.newPost
      };
    case C.EDIT_POST_SUCCESS:
      console.log('postid: ',payload.editedPost.id)
      return (state.id !== payload.editedPost.id) ?
        state :
        payload.editedPost;
    default :
      return state;
  }
}
