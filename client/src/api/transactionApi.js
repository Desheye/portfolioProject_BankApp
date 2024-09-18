// src/api/transactionApi.js
import axios from 'axios';

/**
 * Fetches the recipient's name based on the provided account number.
 * This function will query the backend API to retrieve the recipient's name.
 * If the account number is not found in the Redux state, this function will 
 * fetch the data from the MongoDB database via the API.
 * 
 * @param {string} accountNumber - The account number of the recipient.
 * @returns {Promise<string>} - A promise that resolves to the recipient's name.
 */
export const fetchRecipientName = async (accountNumber) => {
  console.log('fetchRecipientName called'); // Initial call logging
  try {
    console.debug(`Attempting to fetch recipient name for account number: ${accountNumber}`);
    const response = await axios.get(`/api/users/recipient-name/${accountNumber}`);
    console.debug('Recipient name fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching recipient name:', error);
    throw error; // Rethrow to allow handling in the calling function
  }
};

/**
 * Submits a transaction with the provided details.
 * This function will post transaction details to the backend API, 
 * which will process the transaction and update balances in the database.
 * 
 * @param {Object} transactionDetails - The details of the transaction including account number, recipient name, amount, etc.
 * @returns {Promise<Object>} - A promise that resolves to the server's response, indicating the success or failure of the transaction.
 */
export const submitTransaction = async (transactionDetails) => {
  console.log('submitTransaction called'); // Initial call logging
  try {
    console.debug('Attempting to submit transaction with details:', transactionDetails);
    const response = await axios.post(`/api/users/submit-transaction`, transactionDetails);
    console.debug('Transaction submitted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error occurred while submitting transaction:', error);
    throw error; // Rethrow to allow handling in the calling function
  }
};
