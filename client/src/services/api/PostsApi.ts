import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../core/axios';

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

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => `posts/${id}`,
    }),
    createPost: builder.mutation<void, any>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
    }),
    addImageToPost: builder.mutation<any, any>({
      query: (data) => {
        const { id, coverImage } = data;

        const formData = new FormData();
        formData.append('file', coverImage);

        return {
          url: `posts/${id}`,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: coverImage,
        };
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useAddImageToPostMutation,
} = postsApi;
