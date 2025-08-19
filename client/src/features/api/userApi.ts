import { MinimalUserResponse } from "../../utils/api-response-types";
import { User } from "../../utils/types";
import { baseApi } from "./baseApi";

export const userApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    getUserByUsername: builder.query({
      query: (username) => `/users/find?username=${username}`,
    }),
    updateUser: builder.mutation<
      MinimalUserResponse,
      Partial<User> & Pick<User, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: patch,
      }),
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
  useUpdateUserMutation,
  useForgotPasswordMutation,
} = userApiSlice;
