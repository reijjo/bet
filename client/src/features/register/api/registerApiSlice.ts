import { baseApi } from "../../api/baseApi";

export const registerApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
      query: (email) => `/users/find?email=${email}`,
    }),
  }),
});

export const { useLazyGetUserByEmailQuery } = registerApiSlice;
