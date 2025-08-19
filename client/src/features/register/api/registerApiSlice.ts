import { RegisterUserApiResponse } from "../../../utils/api-response-types";
import { RegisterValues } from "../../../utils/types";
import { baseApi } from "../../api/baseApi";

export const registerApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
      query: (email) => `/users/find?email=${email}`,
    }),
    createUser: builder.mutation<RegisterUserApiResponse, RegisterValues>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLazyGetUserByEmailQuery, useCreateUserMutation } =
  registerApiSlice;
