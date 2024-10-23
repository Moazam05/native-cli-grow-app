import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import themeReducer from './theme/themeSlice';
import {apiSlice} from './api/apiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,

  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
