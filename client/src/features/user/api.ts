import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    auth: builder.query({
      query: () => 'authentication',
    }),
    login: builder.mutation({
      query(data) {
        return {
          url: 'authentication/log-in',
          method: 'POST',
          data,
        };
      },
    }),
    register: builder.mutation({
      query(data) {
        return {
          url: 'authentication/register',
          method: 'POST',
          data,
        };
      },
    }),
  }),
});

export const { useAuthQuery, useLoginMutation, useRegisterMutation } = authApi;
