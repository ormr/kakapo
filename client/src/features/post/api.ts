import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `posts`,
    }),
    getPost: builder.query({
      query: (id) => `posts/${id}`,
    }),
    createPost: builder.mutation({
      query(data) {
        return {
          url: 'posts',
          method: 'POST',
          data,
        };
      },
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useCreatePostMutation } =
  postApi;
