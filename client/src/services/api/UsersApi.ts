import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../core/axios';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => headers,
    credentials: 'include',
  }),
  tagTypes: ['Users'],
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
    }),
  }),
});

export const { useAddProfilePictureMutation } = usersApi;
