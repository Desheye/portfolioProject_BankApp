// actions/userActions.js

// Action Types
export const SET_SECURITY_TYPE = 'SET_SECURITY_TYPE';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_ERROR = 'SET_ERROR';

// Action Creators
export const setSecurityType = (type, value) => ({
  type: SET_SECURITY_TYPE,
  payload: { type, value },
});

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

// Async Action Creators
export const signUpUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      dispatch(setUserData({
        fullname: data.user.fullname,
        accountNumber: data.user.accountNumber,
        balance: data.user.balance,
      }));

      // Note: Navigation should be handled in the component, not here
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};

// Add the missing fetchUserData action
export const fetchUserData = (type, value) => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, value }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      dispatch(setUserData({
        fullname: data.user.fullname,
        accountNumber: data.user.accountNumber,
        balance: data.user.balance,
      }));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};