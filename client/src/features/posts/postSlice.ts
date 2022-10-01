import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const stockImages = [
  'https://traveltimes.ru/wp-content/uploads/2021/05/2262378-1024x683.jpg',
  'https://ruschemicals.com/wp-content/uploads/2021/11/s1200-7.jpg',
  'https://travels.impress.io/app/uploads/sites/3/2020/09/sergey-pesterev-r6FU8zqrgdM-unsplash-1536x1025.jpg',
  'https://placepic.ru/wp-content/uploads/2018/10/572143_main.jpg',
  'https://korona-severa.ru/wp-content/uploads/d/f/7/df795baa94fc629554cdd3228ae35712.jpeg',
  'https://res.klook.com/image/upload/cities/wjjvjtpdjqzdididt8lb.jpg',
];

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
    getPosts: (state) => ({
      ...state,
      loading: true,
    }),
    setPosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      loading: false,
      posts: action.payload.map((item) => ({
        ...item,
        image: stockImages[Math.floor(Math.random() * 5)],
      })),
    }),
    setPostsError: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),
    addPost: (state, action: PayloadAction<Post>) => ({
      ...state,
      posts: [...state.posts, action.payload],
    }),
  },
});

export const { getPosts, setPosts, addPost, setPostsError } = postState.actions;
export const postReducer = postState.reducer;
