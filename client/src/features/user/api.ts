import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../core/axios';
import { User } from '../../services/api/UserApi';
import { RegisterData } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    auth: builder.query({
      query: () => 'authentication',
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: 'authentication/log-in',
          method: 'POST',
          body,
        };
      },
    }),
    register: builder.mutation<RegisterData, any>({
      query(body) {
        return {
          url: 'authentication/register',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useAuthQuery, useLoginMutation, useRegisterMutation } = authApi;
