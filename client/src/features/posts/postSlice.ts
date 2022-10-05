import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import PostActionsType from './types';

interface Author {
  id: string;
  name: string;
  email: string;
  avatarId: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  imageId?: string;
  author?: Author;
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
      state.posts = action.payload;
      state.loading = false;
    },
    setFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts = [...state.posts, action.payload];
    },
  },
  // extraReducers: {
  //   [PostActionsType.RECEIVE_POSTS]: (state, action: PayloadAction) => {
  //     return {
  //       posts: action.payload,
  //       loading: false,
  //     }
  //   }
  // }
});

export const postReducer = postState.reducer;
