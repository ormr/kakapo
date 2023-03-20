import api from '.';

interface Author {
  id: string;
  name: string;
  email: string;
  avatarId: string;
}

export interface Post {
  id: string;
  content: string;
  createdAt: string;
  imageId?: string;
  author: Author;
}

export const postsExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getPostsByUserId: builder.query<Post[], string | undefined>({
      query: (id) => `posts/user/${id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getPostById: builder.query<Post, string | undefined>({
      query: (id) => `posts/${id}`,
    }),
    createPost: builder.mutation<any, any>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    addImageToPost: builder.mutation<any, any>({
      query: (data) => {
        const { id, coverImage } = data;

        const formData = new FormData();
        formData.append('file', coverImage);

        return {
          url: `posts/${id}`,
          method: 'POST',
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
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useAddImageToPostMutation,
} = postsExtendedApi;
