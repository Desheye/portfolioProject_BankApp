import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGOUT
} from '../actions/userActions';

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handling login
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,  // Reset error on new request
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload, // Store user info from login
        isAuthenticated: true,    // Set authentication flag to true on successful login
        error: null,
      };

    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        userInfo: null,           // Reset user info on failure
        isAuthenticated: false,   // Ensure user is not authenticated on failure
        error: action.payload,    // Set error message
      };

    // Handling signup
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,  // Reset error on new request
      };

    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload, // Store user info from signup
        isAuthenticated: false,   // Keep authentication false after signup
        error: null,
      };
      
      case USER_LOGOUT:
      return {
        ...state,
        userInfo: null,
        isAuthenticated: false,
        error: null,
      };

    case USER_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        userInfo: null,           // Reset user info on failure
        isAuthenticated: false,   // Ensure user is not authenticated on failure
        error: action.payload,    // Set error message
      };

    default:
      return state;
  }
};

export default userReducer;