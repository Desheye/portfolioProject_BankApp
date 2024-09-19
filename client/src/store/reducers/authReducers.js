// src/reducers/authReducer.js
// eslint-disable-next-line no-unused-vars
import { SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/userActions';

const initialState = {
  user: null,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // eslint-disable-next-line no-unused-vars
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        //isAuthenticated: true,
        error: null,
      };
    
    // eslint-disable-next-line no-unused-vars
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    
    // eslint-disable-next-line no-unused-vars
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };

    // eslint-disable-next-line no-unused-vars
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;