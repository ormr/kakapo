import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  title: string;
  text: string;
  author: string;
}

export interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

export const postState = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    // updatePost: (state, action: PayloadAction<Post>) => {
    //   state.posts
    // }
  }
});

export const { addPost } = postState.actions;
export const postReducer = postState.reducer;
