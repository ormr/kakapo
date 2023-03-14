import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../core/axios';
import { Post } from './postSlice';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `posts`,
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `posts/${id}`,
    }),
    createPost: builder.mutation({
      query(body) {
        return {
          url: 'posts',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useCreatePostMutation } =
  postApi;
