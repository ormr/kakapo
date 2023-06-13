import api from '.';
import { User } from './AuthApi';

export const usersExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<any, any>({
      query: (userId) => `users/${userId}`,
      providesTags: ['User'],
    }),
    updateUserData: builder.mutation<any, { userId: string; body: Partial<User> }>({
      query: ({ userId, body }) => {
        return {
          url: `users/${userId}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),
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

export const { useGetUserByIdQuery, useAddProfilePictureMutation, useUpdateUserDataMutation } = usersExtendedApi;
