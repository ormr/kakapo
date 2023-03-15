import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../services/api/PostsApi';

export interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

export const postsState = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts = [...state.posts, action.payload];
    },
  },
});

export const postReducer = postsState.reducer;
