import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import {apiSlice} from './api/apiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
