// reducers/userReducer.js
import { SET_SECURITY_TYPE, SET_USER_DATA, SET_ERROR } from '../actions/userActions';

const initialState = {
  type: null,
  value: '',
  fullname: '',
  accountNumber: '',
  accountBalance: 0,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SECURITY_TYPE:
      return {
        ...state,
        type: action.payload.type,
        value: action.payload.value,
      };
    case SET_USER_DATA:
      return {
        ...state,
        fullname: action.payload.fullname,
        accountNumber: action.payload.accountNumber,
        accountBalance: action.payload.balance,
        error: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
