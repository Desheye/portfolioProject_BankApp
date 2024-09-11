import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

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

export const fetchUserData = async (type, value) => {
  if (!type || !value) throw new Error('Type and value are required');

  try {
    const { data } = await axios.post(`${API_URL}/get-user-data`, { type, value });
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
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
