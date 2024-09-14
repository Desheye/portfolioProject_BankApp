// actions/userActions.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const fullUrlPath = API_URL;
console.log(fullUrlPath);

export const verifyCredentials = async (type, value) => {
  if (!type || !value) throw new Error('Type and value are required');

  try {
    const { data } = await axios.post(`${API_URL}/verify`, { type, value });
    return data.isValid;
  } catch (error) {
    console.error('Error verifying credentials:', error);
    throw new Error('Failed to verify credentials');
  }
};

export const fetchUserData = (type, value) => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/get-user-data', { // Ensure this matches your backend route
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

export const uploadImage = async (formData) => {
  if (!formData) throw new Error('Form data is required');

  try {
    const { data } = await axios.post(`${API_URL}/upload-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};



