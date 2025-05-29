import {
  MinimalUserResponse,
  RegisterUserApiResponse,
} from "../../utils/api-response-types";
import { RegisterValues, User } from "../../utils/types";
import { baseApi } from "./baseApi";

export const userApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    getUserByEmail: builder.query({
      query: (email) => `/users/find?email=${email}`,
    }),
    getUserByUsername: builder.query({
      query: (username) => `/users/find?username=${username}`,
    }),
    registerUser: builder.mutation<RegisterUserApiResponse, RegisterValues>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
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
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByEmailQuery,
  useLazyGetUserByEmailQuery,
  useGetUserByUsernameQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
