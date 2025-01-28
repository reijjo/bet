import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetSportApiResponse } from "../../utils/api-response-types";
import { config } from "../../utils/config";
import { Sport } from "../../utils/types";

const { BACKEND_URL } = config;

export const sportsApiSlice = createApi({
  reducerPath: "sportsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api` }),
  tagTypes: ["Sport"],
  endpoints: (builder) => ({
    getSports: builder.query<Sport[], void>({
      query: () => "/sports",
      transformResponse: (response: GetSportApiResponse) => {
        return response.data;
      },
      providesTags: (result = []) => [
        "Sport",
        ...result.map(({ id }) => ({ type: "Sport", id }) as const),
      ],
    }),
    addSport: builder.mutation<Sport, Partial<Sport>>({
      query: (newSport) => ({
        url: "/sports",
        method: "POST",
        body: newSport,
      }),
      invalidatesTags: ["Sport"],
    }),
  }),
});

export const { useGetSportsQuery, useAddSportMutation } = sportsApiSlice;
