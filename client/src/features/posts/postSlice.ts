import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  image?: string;
  author?: string;
}

export interface PostState {
  error: boolean;
  loading: boolean;
  posts: Post[];
}

const initialState: PostState = {
  error: false,
  loading: false,
  posts: [],
};

export const postState = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    receivePosts: (state, action: PayloadAction<Post[]>) => {
      state.loading = false;
      state.posts = action.payload;
    },
    setFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts = [...state.posts, action.payload];
    },
  },
});

export const postReducer = postState.reducer;
