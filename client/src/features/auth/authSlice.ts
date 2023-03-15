import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../services/api/AuthApi';

export interface AuthState {
  user?: User;
}

const initialState: AuthState = {
  user: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user } }) => {
      state.user = user;
    },
    clearUserData: (state) => {
      state.user = undefined;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export const authReducer = authSlice.reducer;
