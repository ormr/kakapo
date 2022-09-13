import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  image: string;
  author: string;
}

export interface PostState {
  posts: Post[];
}

const stockImages = [
  'https://traveltimes.ru/wp-content/uploads/2021/05/2262378-1024x683.jpg',
  'https://ruschemicals.com/wp-content/uploads/2021/11/s1200-7.jpg',
  'https://travels.impress.io/app/uploads/sites/3/2020/09/sergey-pesterev-r6FU8zqrgdM-unsplash-1536x1025.jpg',
  'https://placepic.ru/wp-content/uploads/2018/10/572143_main.jpg',
  'https://korona-severa.ru/wp-content/uploads/d/f/7/df795baa94fc629554cdd3228ae35712.jpeg',
  'https://res.klook.com/image/upload/cities/wjjvjtpdjqzdididt8lb.jpg',
];

const initialState: PostState = {
  posts: [
    {
      id: '1',
      title: 'My essay in english',
      description: "That's how I started this post",
      createdAt: new Date().toDateString(),
      image: stockImages[Math.floor(Math.random() * 5)],
      author: 'Serafim Gavrilov',
    },
    {
      id: '2',
      title: 'Another essay in english',
      description: "That's how I started this post",
      createdAt: new Date().toDateString(),
      image: stockImages[Math.floor(Math.random() * 5)],
      author: 'Vasiliy Gavrilov',
    },
    {
      id: '3',
      title: 'My best essay in english',
      description: "That's how I started this post",
      createdAt: new Date().toDateString(),
      image: stockImages[Math.floor(Math.random() * 5)],
      author: 'Ivan Gavrilov',
    },
    {
      id: '3',
      title: 'The final essay in english',
      description: "That's how I started this post",
      createdAt: new Date().toDateString(),
      image: stockImages[Math.floor(Math.random() * 5)],
      author: 'Sergey Gavrilov',
    },
  ],
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
  },
});

export const { addPost } = postState.actions;
export const postReducer = postState.reducer;
