import api from '.';

export const commentsExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addCommentToPost: builder.mutation<any, any>({
      query: ({ content, postId: id }) => ({
        url: `comments`,
        method: 'POST',
        body: {
          content,
          post: {
            id,
          },
        },
        // invalidatesTags: (_result: any, _error: any, arg: any) => [
        //   { type: 'Posts', id: arg.id },
        // ],
        invalidatesTags: 'Posts',
      }),
    }),
  }),
});

export const { useAddCommentToPostMutation } = commentsExtendedApi;
