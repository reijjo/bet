import { baseApi } from "../../api/baseApi";

export const forgotPwApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/users/forgot",
        method: "POST",
        body: { email },
      }),
    }),
    checkToken: builder.query({
      query: (token) => `/users/forgot/${token}`,
      transformErrorResponse: (error) => ({
        status: error.status,
        data: error.data,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useCheckTokenQuery } =
  forgotPwApiSlice;
