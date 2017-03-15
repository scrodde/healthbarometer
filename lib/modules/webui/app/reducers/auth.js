import _ from 'lodash';
import {
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAILURE,
  AUTH_ERROR,
  AUTH_SIGNOUT,
} from '../actions';

const auth = (state = {}, action) => {
  let newState = state;
  switch (action.type) {
    case AUTH_SIGNIN:
      newState = {
        isLoading: true,
      };
      return Object.assign({}, newState);
    case AUTH_SIGNIN_SUCCESS:
      newState = {
        isLoading: false,
        currentUser: action.user,
      };
      return Object.assign({}, newState);
    case AUTH_SIGNIN_FAILURE:
      newState = {
        isLoading: false,
        isError: true,
        currentUser: null,
      };
      return Object.assign({}, newState);
    case AUTH_ERROR:
      return Object.assign({}, newState, {
        isLoading: false,
        isError: true,
        errorMessage: action.error,
        currentUser: null,
      });
    case AUTH_SIGNOUT:
      return Object.assign({})
    default:
      return state;
  }
}

export default auth;
