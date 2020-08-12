import { actionTypes as C, setInputValuesAction, clearInputFieldsAction } from "../actions";
import React from "react";

export default function writePostModal (state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case C.CLOSE_MODAL:
      return {
        hide: true,
        header: null,
        buttonTitle: '',
        inputValues: inputValues(state.inputValues, clearInputFieldsAction())
      };
    case C.SET_MODAL_INPUT:
      return {
        ...state,
        inputValues: inputValues(state.inputValues, action)
      };
    case C.OPEN_ADD_POST_MODAL :
      return {
        ...state,
        hide: false,
        header: 'New Post',
        buttonTitle: 'Post',
      };
    case C.OPEN_EDIT_POST_MODAL :
      return {
        ...state,
        hide: false,
        buttonTitle: 'Edit',
        inputValues: inputValues(state.inputValues, setInputValuesAction(payload.inputValues))
      };
    default:
      return state;
  }
}

function inputValues (state, { type, payload }) {
  switch (type) {
    case C.CLEAR_FIELDS:
      return {
        postTitleInput: '',
        postBodyInput: '',
        postImg: ''
      };
    case C.SET_MODAL_INPUT:
      return {
        ...state,
        ...payload.inputValues
      };
    default:
      return state;
  }
}
