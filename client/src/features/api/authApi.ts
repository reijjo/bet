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
      invalidatesTags: [{ type: "Session", id: "CURRENT" }],
    }),
    logout: builder.mutation<BasicApiResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: [{ type: "Session", id: "CURRENT" }],
    }),
    updateToken: builder.mutation<BasicApiResponse, TokenUpdate>({
      query: (patch) => {
        console.log("token", patch.token);
        return {
          url: `/auth/register/${patch.token}`,
          method: "PATCH",
          body: patch,
        };
      },
    }),
    refreshSession: builder.mutation<BasicApiResponse, void>({
      query: () => ({
        url: "/auth/refresh-session",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    getSessionUser: builder.query<SessionApiResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: [{ type: "Session", id: "CURRENT" }],
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          return {
            status: response.status,
            data: {
              success: false,
              message: "Your session has expired. Please login again.",
            },
          };
        }
        return {
          status: response.status,
          data: response.data,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useVerifyQuery,
  useUpdateTokenMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetSessionUserQuery,
  useLazyGetSessionUserQuery,
  useRefreshSessionMutation,
} = authApiSlice;
