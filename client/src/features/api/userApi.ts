import { baseApi } from "./baseApi";

export const userApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    getUserByUsername: builder.query({
      query: (username) => `/users/find?username=${username}`,
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByUsernameQuery } = userApiSlice;
