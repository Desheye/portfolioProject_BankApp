// src/actions/userActions.js
import axios from 'axios';

// Action Types
export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAIL = 'USER_SIGNUP_FAIL';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOGOUT = 'USER_LOGOUT';


// Action to handle logout
export const logoutUser = () => (dispatch) => {
  // Clear any user data from local storage/session storage
  localStorage.removeItem('userInfo');

  // Dispatch the logout action to Redux
  dispatch({ type: USER_LOGOUT });
};


// Signup action
export const signupUser = (userData) => async (dispatch) => {
  console.log('signupUser action called with userData:', userData);

  try {
    dispatch({ type: USER_SIGNUP_REQUEST });
    console.log('Dispatched USER_SIGNUP_REQUEST action');

    console.log('Sending signup request with data:', userData);
    const response = await axios.post('/api/users/signup', userData);
    
    console.log('Received signup response:', response);

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: response.data,
    });

    console.log('Dispatched USER_SIGNUP_SUCCESS action with payload:', response.data);
  } catch (error) {
    console.error('Signup Error:', error);

    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });

    console.error('Dispatched USER_SIGNUP_FAIL action with payload:', error.response && error.response.data.message
      ? error.response.data.message
      : error.message);
  }
};


// Login action
/*import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL
} from '../constants/userConstants';*/

export const loginUser = (credentials) => async (dispatch) => {
  console.log('loginUser action called with credentials:', credentials);

  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    console.log('Dispatched USER_LOGIN_REQUEST action');

    // Prepare the login data based on the provided credentials
    let loginData;

    if (credentials.pin) {
      // If PIN is provided, send PIN only
      loginData = { pin: credentials.pin };
    } else if (credentials.accountNumber && credentials.password) {
      // If Account Number and Password are provided, send both
      loginData = { accountNumber: credentials.accountNumber, password: credentials.password };
    } else {
      // Handle the case where neither PIN nor Account Number + Password are provided
      throw new Error('Invalid credentials: Please provide either PIN or Account Number with Password');
    }

    console.log('Sending login request with data:', loginData);

    const response = await axios.post('/api/users/login', loginData);

    console.log('Received login response:', response);

    // Dispatch success action
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });

    console.log('Dispatched USER_LOGIN_SUCCESS action with payload:', response.data);

    // Save user data to localStorage
    localStorage.setItem('userInfo', JSON.stringify(response.data));

  } catch (error) {
    console.error('Login Error:', error);

    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });

    console.error('Dispatched USER_LOGIN_FAIL action with payload:', error.response && error.response.data.message
      ? error.response.data.message
      : error.message);
  }
};


