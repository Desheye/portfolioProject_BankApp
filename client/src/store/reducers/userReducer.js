// src/reducers/userReducer.js
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL
} from '../actions/userActions';

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };

    case USER_LOGIN_SUCCESS:
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        isAuthenticated: true,
        error: null
      };

    case USER_LOGIN_FAIL:
    case USER_SIGNUP_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userReducer;