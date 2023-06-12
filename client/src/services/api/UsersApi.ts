import api from '.';
import { User } from './AuthApi';

export const usersExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<any, any>({
      query: (userId) => `users/${userId}`,
      providesTags: ['User'],
    }),
    updateUserData: builder.mutation<Pick<User, 'id'>, User>({
      query: ({ id: userId }) => {
        return {
          url: `users/${userId}`
        }
      }
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
