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
  comments: any[];
  fileIds: any[];
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
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }];
      },
    }),
    getPostById: builder.query<Post, string | undefined>({
      query: (id) => `posts/${id}`,
      providesTags: (result) =>
        result
          ? [
              { type: 'Posts', id: result.id },
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    createPost: builder.mutation<Post, { content: string }>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    addFileToPost: builder.mutation<any, any>({
      query: (data) => {
        const { postId, file } = data;

        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `posts/${postId}/add-file`,
          method: 'POST',
          body: formData,
        };
      },
    }),
    addCommentToPost: builder.mutation<any, any>({
      query: ({ content, postId: id }) => ({
        url: 'posts/add-comment',
        method: 'POST',
        body: {
          content,
          post: {
            id,
          },
        },
      }),
      invalidatesTags: (result, error, arg) =>
        result && !error
          ? [{ type: 'Posts', id: arg.id }]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useAddFileToPostMutation,
  useAddCommentToPostMutation,
} = postsExtendedApi;
