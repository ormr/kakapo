import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const countState = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increase: (state) => {
      state.value += 1
    },
    decrease: (state) => {
      state.value -= 1
    },
  },
});

export const { increase, decrease } = countState.actions;
export const countReducer = countState.reducer;