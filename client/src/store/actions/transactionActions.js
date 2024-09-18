// src/store/actions/transactionActions.js
// Action Types
import axios from 'axios';
export const SET_ACCOUNT_NUMBER = 'SET_ACCOUNT_NUMBER';
export const SET_AMOUNT = 'SET_AMOUNT';
export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_TRANSFER_METHOD = 'SET_TRANSFER_METHOD';
export const SET_MEMO = 'SET_MEMO';
export const FETCH_RECIPIENT_NAME_SUCCESS = 'FETCH_RECIPIENT_NAME_SUCCESS';
export const FETCH_RECIPIENT_NAME_FAILURE = 'FETCH_RECIPIENT_NAME_FAILURE';
export const TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS';
export const TRANSACTION_FAILURE = 'TRANSACTION_FAILURE';


// Action Creators

/**
 * Action to set the account number in the state.
 * @param {string} accountNumber - The account number of the recipient.
 * @returns {Object} - The action object with type and payload.
 */
export const setAccountNumber = (accountNumber) => ({
  type: SET_ACCOUNT_NUMBER,
  payload: accountNumber
});

export const setRecipientAccountNumber = (number) => ({
  type: 'SET_RECIPIENT_ACCOUNT_NUMBER',
  payload: number
});
/**
 * Action to set the amount to be transferred.
 * @param {number} amount - The amount to be transferred.
 * @returns {Object} - The action object with type and payload.
 */
export const setAmount = (amount) => ({
  type: SET_AMOUNT,
  payload: amount
});

/**
 * Action to set the currency for the transaction.
 * @param {string} currency - The currency for the transaction.
 * @returns {Object} - The action object with type and payload.
 */
export const setCurrency = (currency) => ({
  type: SET_CURRENCY,
  payload: currency
});

/**
 * Action to set the transfer method.
 * @param {string} transferMethod - The transfer method (e.g., instant, scheduled).
 * @returns {Object} - The action object with type and payload.
 */
export const setTransferMethod = (transferMethod) => ({
  type: SET_TRANSFER_METHOD,
  payload: transferMethod
});

/**
 * Action to set the memo for the transaction.
 * @param {string} memo - The optional memo for the transaction.
 * @returns {Object} - The action object with type and payload.
 */
export const setMemo = (memo) => ({
  type: SET_MEMO,
  payload: memo
});

// Async Action Creators

/**
 * Async action to fetch the recipient's name based on account number.
 * Dispatches success or failure actions based on the API response.
 * @param {string} accountNumber - The account number of the recipient.
 */
export const fetchRecipientName = (accountNumber) => async (dispatch) => {
  try {
    console.log('Fetching recipient name for account number:', accountNumber);
    const response = await axios.get(`/api/users/recipient-name/${accountNumber}`);
    console.debug('Recipient name fetched successfully:', response.data);
    dispatch({ type: FETCH_RECIPIENT_NAME_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Failed to fetch recipient name:', error);
    dispatch({ type: FETCH_RECIPIENT_NAME_FAILURE, payload: error.message });
  }
};

/**
 * Async action to submit the transaction details.
 * Dispatches success or failure actions based on the API response.
 * @param {Object} transactionDetails - The details of the transaction.
 */
export const submitTransaction = (transactionDetails) => async (dispatch) => {
  try {
    console.log('Submitting transaction with details:', transactionDetails);
    const response = await axios.post(`/api/users/submit-transaction`, transactionDetails);
    console.debug('Transaction submitted successfully:', response.data);
    dispatch({ type: TRANSACTION_SUCCESS });
  } catch (error) {
    console.error('Failed to submit transaction:', error);
    dispatch({ type: TRANSACTION_FAILURE, payload: error.message });
  }
};

