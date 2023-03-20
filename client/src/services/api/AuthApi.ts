import api from '.';

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

export const authExtendedApi = api.injectEndpoints({
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
    logout: builder.mutation<User, void>({
      query: () => ({
        url: 'authentication/log-out',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useAuthQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authExtendedApi;
