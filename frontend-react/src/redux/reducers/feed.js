import { actionTypes as C } from "../actions";
import views from "../actions/feed-views";

const initialState = {
  view: views.FEED
};

export default function feed (state = initialState, { type, payload }) {
  switch (type) {
    case C.CHANGE_VIEW:
      return {
        view: payload.targetView
      }
    default:
      return state;
  }
}
