import {
  BasicApiResponse,
  LoginUserApiResponse,
  RegisterUserApiResponse,
} from "../../utils/api-response-types";
import {
  LoginValues,
  SessionApiResponse,
  TokenUpdate,
} from "../../utils/types";
import { baseApi } from "./baseApi";

export const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verify: builder.query<RegisterUserApiResponse, string>({
      query: (token) => `/auth/register/${token}`,
      transformErrorResponse: (error) => ({
        status: error.status,
        data: error.data,
      }),
    }),
    login: builder.mutation<LoginUserApiResponse, LoginValues>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
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
    getSessionUser: builder.query<SessionApiResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useVerifyQuery,
  useUpdateTokenMutation,
  useLoginMutation,
  useGetSessionUserQuery,
} = authApiSlice;
