import { RegisterUserApiResponse } from "../../utils/api-response-types";
import { RegisterValues } from "../../utils/types";
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
  }),
});

export const { useRegisterMutation } = authApiSlice;
