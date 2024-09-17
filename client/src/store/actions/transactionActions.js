// src/store/actions/transactionActions.js

export const SET_ACCOUNT_NUMBER = 'SET_ACCOUNT_NUMBER';
export const SET_AMOUNT = 'SET_AMOUNT';
export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_TRANSFER_METHOD = 'SET_TRANSFER_METHOD';
export const SET_MEMO = 'SET_MEMO';
export const FETCH_RECIPIENT_NAME_SUCCESS = 'FETCH_RECIPIENT_NAME_SUCCESS';
export const FETCH_RECIPIENT_NAME_FAILURE = 'FETCH_RECIPIENT_NAME_FAILURE';
export const TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS';
export const TRANSACTION_FAILURE = 'TRANSACTION_FAILURE';

// Action creators for setting form values
export const setAccountNumber = (accountNumber) => ({
  type: SET_ACCOUNT_NUMBER,
  payload: accountNumber
});

export const setAmount = (amount) => ({
  type: SET_AMOUNT,
  payload: amount
});

export const setCurrency = (currency) => ({
  type: SET_CURRENCY,
  payload: currency
});

export const setTransferMethod = (transferMethod) => ({
  type: SET_TRANSFER_METHOD,
  payload: transferMethod
});

export const setMemo = (memo) => ({
  type: SET_MEMO,
  payload: memo
});

// Async action creators
export const fetchRecipientName = (accountNumber) => async (dispatch) => {
  try {
    // Replace with your API call
    const response = await fetch(`/api/users/recipient-name/${accountNumber}`);
    console.log('transactionActions Redux: ', response);
    const recipientName = await response.json();
    dispatch({ type: FETCH_RECIPIENT_NAME_SUCCESS, payload: recipientName });
  } catch (error) {
    dispatch({ type: FETCH_RECIPIENT_NAME_FAILURE, payload: error.message });
  }
};

export const submitTransaction = (transactionDetails) => async (dispatch) => {
  try {
    // Replace with your API call
    await fetch('/api/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionDetails)
    });
    dispatch({ type: TRANSACTION_SUCCESS });
  } catch (error) {
    dispatch({ type: TRANSACTION_FAILURE, payload: error.message });
  }
};
