// src/api/transactionApi.js
import axios from 'axios';

/**
 * Fetches the recipient's name based on the account number.
 * @param {string} accountNumber - The account number of the recipient.
 * @returns {Promise<string>} - A promise that resolves to the recipient's name.
 */
export const fetchRecipientName = async (accountNumber) => {
  console.log('fetchRecipientName');
  try {
    console.debug(`Fetching recipient name for account number: ${accountNumber}`);
    const response = await axios.get(`/api/users/recipient-name/${accountNumber}`);
    console.debug('Recipient name fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipient name:', error);
    throw error; // Rethrow to handle in the caller
  }
};

/**
 * Submits a transaction with the provided details.
 * @param {Object} transactionDetails - The details of the transaction.
 * @returns {Promise<Object>} - A promise that resolves to the server response.
 */
export const submitTransaction = async (transactionDetails) => {
  console.log('submitTransaction Fetch');
  try {
    console.debug('Submitting transaction with details:', transactionDetails);
    const response = await axios.post(`/api/users/submit-transaction`, transactionDetails);
    console.debug('Transaction submitted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting transaction:', error);
    throw error; // Rethrow to handle in the caller
  }
};
