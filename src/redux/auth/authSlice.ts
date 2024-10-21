import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

interface UserState {
  user: {
    name?: string;
    userId?: string;
    email?: string;
    login_pin_exist?: string;
    phone_exist?: string;
    balance?: number;
    token?: string;
  };
}

const initialState: UserState = {
  user: {},
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;

export const selectedUser = (state: RootState) => state.auth.user;

export default userSlice.reducer;
