// src/actions/userActions.js
import axios from 'axios';

// Action Types
export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAIL = 'USER_SIGNUP_FAIL';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';

// Signup action
export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });
    const response = await axios.post('/api/users/signup', userData);
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Login action
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { pin, password } = credentials;
    let loginData = pin ? { pin, password } : { password };
    const response = await axios.post('/api/users/login', loginData);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};