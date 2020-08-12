export const selectIsAuthenticated = state => state.authentication.isAuthenticated;

export const selectUser = state => {
  const { username, uid } = state.authentication;
  return { username, uid };
};

export const selectUid = state => state.authentication.uid;

export const selectUsername = state => state.authentication.username;

export const selectAuthentication = state => state.authentication;

export const selectFeedView = state => state.feed.view;

export const selectPosts = state => state.postsView;
