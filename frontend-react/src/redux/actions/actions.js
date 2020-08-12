import { history } from '../../history';
import C from './action-types';

export const changeFeedViewAction = targetView => {
  // history.push(`/${targetView}`);
  return { type: C.CHANGE_VIEW, payload: { targetView } };
};

export const clearInputFieldsAction = () => ({
  type: C.CLEAR_FIELDS
});

export const setInputValuesAction = inputValues => ({
  type: C.SET_MODAL_INPUT,
  payload: { inputValues }
});

export const closeWritePostModalAction = () => ({
  type: C.CLOSE_MODAL
});

export const openAddPostModalAction = () => ({
  type: C.OPEN_ADD_POST_MODAL
});

export const openEditPostModalAction = inputValues => ({
  type: C.OPEN_EDIT_POST_MODAL,
  payload: { inputValues }
});


