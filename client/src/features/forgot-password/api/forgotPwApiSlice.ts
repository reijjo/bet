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
  }),
});

export const { useForgotPasswordMutation } = forgotPwApiSlice;
