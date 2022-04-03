import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetUserDetail, UserDetail } from './userTypes';

const baseUrl = 'http://localhost:8000/api';

const baseQuery = fetchBaseQuery({
  baseUrl,

  prepareHeaders: (headers) => {
    headers.set('x-auth-token', localStorage.getItem('token') ?? '');

    return headers;
  },
});
export const usersApi = createApi({
  reducerPath: 'facturaAPI',
  baseQuery,
  tagTypes: ['Users', 'updateUsers'],
  endpoints: (builder) => ({
    getUserList: builder.query<{ data: GetUserDetail }, void>({
      query: () => 'users',

      providesTags: ['Users'],
    }),
    getUserById: builder.query<{ data: UserDetail }, string>({
      query: (id) => `users/${id}`,
      providesTags: ['updateUsers'],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => ['Users', 'updateUsers'],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/${data.userId}`,
        method: 'PUT',
        body: data.updateUserData,
      }),
      invalidatesTags: () => ['Users', 'updateUsers'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users', 'updateUsers'],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUserListQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
