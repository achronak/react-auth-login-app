import { userActionConstants } from '../constants/client';

let data = JSON.parse(localStorage.getItem('user'));
const initialState = data ? { loggedIn: true, data } : {};

export function userAuth(state = initialState, action) {
  switch (action.type) {
    case userActionConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        data: action.user
      };
    case userActionConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        data: action.user
      };
    case userActionConstants.LOGIN_FAILURE:
      return {};
    case userActionConstants.LOGOUT:
      return {};
    default:
      return state
  }
}
