import api from '.';

export const usersExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addProfilePicture: builder.mutation<any, any>({
      query: (profilePicture) => {
        const formData = new FormData();
        formData.append('file', profilePicture);

        return {
          url: 'users/avatar',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useAddProfilePictureMutation } = usersExtendedApi;
