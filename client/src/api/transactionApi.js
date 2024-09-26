// src/api/transactionApi.js
import axios from 'axios';

export const fetchRecipientName = async (accountNumber) => {
  try {
    console.log("Making API call to fetch recipient name with account number:", accountNumber);
    // Update this URL to match the backend route
    const response = await axios.get(`/api/users/recipient-name/${accountNumber}`); // Ensure the endpoint matches
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipient name:", error);
    throw error;
  }
};


export const submitTransaction = async (transactionDetails) => {
  console.debug('submitTransaction called with:', transactionDetails);
  try {
    const response = await axios.post(`/api/users/submit-transaction`, transactionDetails);
    console.debug('Response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting transaction:', error);
    throw error;
  }
};

