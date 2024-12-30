import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Bet } from "../../utils/types";

export const betApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Bet"],
  endpoints: (builder) => ({
    getBets: builder.query<Bet[], void>({
      query: () => "/bets",
      transformResponse: (response: Bet[]) => {
        return response.reverse();
      },
      providesTags: (result = []) => [
        "Bet",
        ...result.map(({ id }) => ({ type: "Bet", id }) as const),
      ],
    }),
    getBetById: builder.query<Bet, string | number>({
      query: (id) => `/bets/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Bet", id }],
    }),
  }),
});

export const { useGetBetsQuery, useGetBetByIdQuery } = betApiSlice;
