import {combineReducers} from 'redux';
import authReducer from './auth/authSlice';
// import themeReducer from "./reducers/themeSlice";
// import stockReducer from "./reducers/stockSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  // theme: themeReducer,
  // stock: stockReducer,
});

export default rootReducer;
