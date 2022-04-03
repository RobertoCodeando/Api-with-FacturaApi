import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:8000/api';

const baseQuery = fetchBaseQuery({
  baseUrl,
});
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    postSignin: builder.mutation({
      query: (data) => ({ url: '/auth', method: 'POST', body: data }),
    }),
  }),
});

export const { usePostSigninMutation } = authApi;
