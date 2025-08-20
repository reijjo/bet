import { baseApi } from "./baseApi";

export const userApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    getUserByUsername: builder.query({
      query: (username) => `/users/find?username=${username}`,
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `/users/forgot`,
        method: "POST",
        body: { email },
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByUsernameQuery,
  useForgotPasswordMutation,
} = userApiSlice;
