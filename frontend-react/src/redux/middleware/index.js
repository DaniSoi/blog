export const saver = store => next => action => {
  const result = next(action);
  const { postsView, feed, ...rest } = store.getState();
  localStorage['redux-store'] = JSON.stringify(rest);
  return result;
};

export const sessionSaver = store => next => action => {
  const result = next(action);
  const { feed } = store.getState();
  sessionStorage['redux-store'] = JSON.stringify({ feed });
  return result;
}

export const logger = store => next => action => {
  console.groupCollapsed("dispatching", action.type);
  console.log('prev state', store.getState());
  console.log('action', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};
