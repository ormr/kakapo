import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserState {
  user?: User;
  loading: boolean;
  error: boolean;
}

const initialState: UserState = {
  user: undefined,
  loading: false,
  error: false,
}

export const userState = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUser: (state) => ({
      ...state,
      loading: true,
    }),
    setUser: (state, action) => ({
      ...state,
      loading: false,
      user: action.payload,
    }),
    setUserError: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),
  }
});

export const { fetchUser, setUser, setUserError } = userState.actions;
export const userReducer = userState.reducer;
