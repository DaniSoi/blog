import { actionTypes as C } from "../actions";

export default function authentication (state = {}, { type, payload }) {
  switch (type) {
    case C.LOG_IN_REQUEST:
      return {
        isAuthenticated: false,
        isLoading: true,
      };
    case C.LOG_IN_SUCCESS:
      return {
        isAuthenticated: true,
        isLoading: false,
        username: payload.username,
        uid: payload.uid
      };
    case C.LOG_IN_FAILURE:
      return {};
    case C.LOG_OUT:
      return {};
    default:
      return state;
  }
}
