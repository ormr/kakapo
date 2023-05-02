import api from '.';

interface Author {
  id: string;
  name: string;
  email: string;
  avatarId: string;
}

export interface Post {
  id: number;
  content: string;
  createdAt: string;
  imageId?: string;
  author: Author;
  isLiked?: boolean;
  comments: any[];
  fileIds: any[];
}

interface Response<T> {
  items: T;
  count: number;
}

interface Pagination {
  limit: number;
  offset: number;
}

export const postsExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Response<Post[]>, Pagination>({
      query: ({ limit, offset }) => `posts?limit=${limit}&offset=${offset}`,
      providesTags: (result) =>
        result && result.items
          ? [...result.items.map(({ id }) => ({ type: 'Posts', id } as const)), { type: 'Posts', id: 'LIST' }]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getPostsByUserId: builder.query<Response<Post[]>, string | undefined>({
      query: (id) => `posts/user/${id}`,
      providesTags: (result) =>
        result && result.items
          ? [...result.items.map(({ id }) => ({ type: 'Posts', id } as const)), { type: 'Posts', id: 'LIST' }]
          : [{ type: 'Posts', id: 'LIST' }],
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
    toggleLikePost: builder.mutation<void, any>({
      query: ({ isLiked, postId }) => ({
        url: `posts/${!isLiked ? 'like' : 'unlike'}`,
        method: 'POST',
        body: {
          postId,
        },
      }),
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
        result && !error ? [{ type: 'Posts', id: arg.id }] : [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useToggleLikePostMutation,
  useAddFileToPostMutation,
  useAddCommentToPostMutation,
} = postsExtendedApi;
