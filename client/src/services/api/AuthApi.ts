import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../core/axios';

export interface User {
  id: string;
  email: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  avatarId: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => headers,
    credentials: 'include',
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    auth: builder.query<User, void>({
      query: () => 'authentication',
    }),
    login: builder.mutation<User, LoginRequest>({
      query: (body) => ({
        url: 'authentication/log-in',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<User, RegisterRequest>({
      query: (body) => ({
        url: 'authentication/register',
        method: 'POST',
        body,
      }),
    }),
    logOut: builder.mutation<User, void>({
      query: () => ({
        url: 'authentication/log-out',
        method: 'POST',
      }),
    }),
  }),
});

export const { useAuthQuery, useLoginMutation, useRegisterMutation } = authApi;
