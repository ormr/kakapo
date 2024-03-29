import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL } from '../../core/axios';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => headers,
    credentials: 'include',
  }),
  tagTypes: ['Auth', 'Users', 'Posts'],
  endpoints: () => ({}),
});

export default api;
