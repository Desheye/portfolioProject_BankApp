// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // Redux Toolkit includes thunk by default, so we don't need to add it manually
});

export default store;