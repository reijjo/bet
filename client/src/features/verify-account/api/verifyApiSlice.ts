import {
  BasicApiResponse,
  MinimalUserResponse,
  RegisterUserApiResponse,
} from "../../../utils/api-response-types";
import { TokenUpdate, User } from "../../../utils/types";
import { baseApi } from "../../api/baseApi";

export const verifyApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyUser: builder.query<RegisterUserApiResponse, string>({
      query: (token) => `/auth/register/${token}`,
      transformErrorResponse: (error) => ({
        status: error.status,
        data: error.data,
      }),
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
    updateUser: builder.mutation<
      MinimalUserResponse,
      Partial<User> & Pick<User, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
  }),
});

export const {
  useVerifyUserQuery,
  useUpdateTokenMutation,
  useUpdateUserMutation,
} = verifyApiSlice;
