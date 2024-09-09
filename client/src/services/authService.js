//client/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust this to your server URL

export const verifyCredentials = async (type, value) => {
  try {
    const response = await axios.post(`${API_URL}/verify`, { type, value });
    return response.data.isValid;
  } catch (error) {
    console.error('Error verifying credentials:', error);
    throw error;
  }
};

// Fetch user data based on PIN or password
export const fetchUserData = async (type, value) => {
  const response = await axios.post('/api/get-user-data', { type, value });
  return response.data;
};