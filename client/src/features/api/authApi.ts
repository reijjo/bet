import {
  BasicApiResponse,
  FinishUserResponse,
  RegisterUserApiResponse,
} from "../../utils/api-response-types";
import { RegisterValues, TokenUpdate } from "../../utils/types";
import { baseApi } from "./baseApi";

export const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterUserApiResponse, RegisterValues>({
      query: (email) => ({
        url: "/auth/register",
        method: "POST",
        body: email,
      }),
    }),
    verify: builder.query<RegisterUserApiResponse, string>({
      query: (token) => `/auth/register/${token}`,
      transformErrorResponse: (error) => ({
        status: error.status,
        data: error.data,
      }),
    }),
    updateToken: builder.mutation<BasicApiResponse, TokenUpdate>({
      query: (patch) => {
        console.log("email", patch.email);
        console.log("token", patch.token);
        return {
          url: `/auth/register/${patch.token}`,
          method: "PATCH",
          body: patch,
        };
      },
    }),
    finishRegister: builder.mutation<FinishUserResponse, RegisterValues>({
      query: (values) => ({
        url: "/auth/register",
        method: "PATCH",
        body: values,
      }),
      transformErrorResponse: (error) => ({
        status: error.status,
        data: error.data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyQuery,
  useUpdateTokenMutation,
  useFinishRegisterMutation,
} = authApiSlice;
