import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface Post {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    author: string;
}

export interface PostState {
    posts: Post[];
}

const initialState: PostState = {
    posts: [
        {
            id: '1',
            title: 'My essay in english',
            description: "That's how I started this post",
            createdAt: new Date().toDateString(),
            author: 'Serafim Gavrilov',
        },
        {
            id: '2',
            title: 'Another essay in english',
            description: "That's how I started this post",
            createdAt: new Date().toDateString(),
            author: 'Vasiliy Gavrilov',
        },
        {
            id: '3',
            title: 'My best essay in english',
            description: "That's how I started this post",
            createdAt: new Date().toDateString(),
            author: 'Ivan Gavrilov',
        },
        {
            id: '3',
            title: 'The final essay in english',
            description: "That's how I started this post",
            createdAt: new Date().toDateString(),
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

export const {addPost} = postState.actions;
export const postReducer = postState.reducer;
