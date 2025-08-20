import { BasicApiResponse } from "../../utils/api-response-types";
import { SessionApiResponse } from "../../utils/types";
import { baseApi } from "./baseApi";

export const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation<BasicApiResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: [{ type: "Session", id: "CURRENT" }],
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
  useLogoutMutation,
  useGetSessionUserQuery,
  useLazyGetSessionUserQuery,
  useRefreshSessionMutation,
} = authApiSlice;
