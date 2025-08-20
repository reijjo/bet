import { LoginUserApiResponse } from "../../../utils/api-response-types";
import { LoginValues } from "../../../utils/types";
import { baseApi } from "../../api/baseApi";

export const loginApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginUserApiResponse, LoginValues>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [{ type: "Session", id: "CURRENT" }],
    }),
  }),
});

export const { useLoginMutation } = loginApiSlice;
