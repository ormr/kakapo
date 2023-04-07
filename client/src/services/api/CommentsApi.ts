import api from '.';

export const commentsExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addCommentToPost: builder.mutation<any, any>({
      query: ({ content, postId: id }) => {
        return {
          url: `comments`,
          method: 'POST',
          body: {
            content,
            post: {
              id,
            }
          }
        }
      }
    }),
  }),
});

export const {
  useAddCommentToPostMutation,
} = commentsExtendedApi;
