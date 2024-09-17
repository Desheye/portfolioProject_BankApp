// src/store/reducers/transactionReducer.js

import {
  SET_ACCOUNT_NUMBER,
  SET_AMOUNT,
  SET_CURRENCY,
  SET_TRANSFER_METHOD,
  SET_MEMO,
  FETCH_RECIPIENT_NAME_SUCCESS,
  FETCH_RECIPIENT_NAME_FAILURE,
  TRANSACTION_SUCCESS,
  TRANSACTION_FAILURE
} from '../actions/transactionActions';

const initialState = {
  accountNumber: '',
  amount: '',
  currency: 'NGR',
  transferMethod: 'instant',
  memo: '',
  recipientName: '',
  transactionStatus: '',
  error: ''
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT_NUMBER:
      return { ...state, accountNumber: action.payload };
    case SET_AMOUNT:
      return { ...state, amount: action.payload };
    case SET_CURRENCY:
      return { ...state, currency: action.payload };
    case SET_TRANSFER_METHOD:
      return { ...state, transferMethod: action.payload };
    case SET_MEMO:
      return { ...state, memo: action.payload };
    case FETCH_RECIPIENT_NAME_SUCCESS:
      return { ...state, recipientName: action.payload };
    case FETCH_RECIPIENT_NAME_FAILURE:
      return { ...state, error: action.payload };
    case TRANSACTION_SUCCESS:
      return { ...state, transactionStatus: 'Success' };
    case TRANSACTION_FAILURE:
      return { ...state, transactionStatus: 'Failure', error: action.payload };
    default:
      return state;
  }
};

export default transactionReducer;
