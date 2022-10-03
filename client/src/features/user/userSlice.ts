import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../services/api/UserApi';

export interface UserState {
  data?: User;
  loading: boolean;
  error: boolean;
}

const initialState: UserState = {
  data: undefined,
  loading: false,
  error: false,
};

export const userState = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    receiveUserData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const userReducer = userState.reducer;
