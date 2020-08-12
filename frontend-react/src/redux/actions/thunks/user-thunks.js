import { UserService } from "../../../services";
import C from "../action-types"
import { history } from "../../../history";
import routes from "../../../routes";
import { changeFeedViewAction } from "../actions";
import views from "../feed-views";

const userService = new UserService();

export const loginAction = (email, password) => async dispatch => {
  dispatch(loginRequestAction());

  try {
    const { data } = await userService.login(email, password);
    dispatch(loginSuccessAction(data));
    dispatch(changeFeedViewAction(views.FEED)); //redirect and change nav state
  } catch (e) {
    console.log('Failed login request: ', e);
    const isFailedAuth = e.response && e.response.status === 401;
    const error = !isFailedAuth; // status 500
    dispatch(loginFailureAction(isFailedAuth, error));
  }

  function loginRequestAction () {
    return { type: C.LOG_IN_REQUEST };
  }

  function loginSuccessAction (user) {
    return { type: C.LOG_IN_SUCCESS, payload: { ...user } };
  }

  function loginFailureAction (isFailedAuth, error) {
    return {
      type: C.LOG_IN_FAILURE,
      payload: { isFailedAuth, error }
    };
  }
};

export const logoutAction = () => async dispatch => {
  dispatch({
    type: C.LOG_OUT
  });

  try {
    await userService.logout();
    history.push(routes.LOGIN);
    //TODO add success and fail actions ?
  } catch (e) {
    console.log('Failed logout request: ', e);
  }
};
