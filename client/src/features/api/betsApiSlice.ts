import {
  GetBetByIdApiResponse,
  GetBetsApiResponse,
} from "../../utils/api-response-types";
import { config } from "../../utils/config";
import { Bet } from "../../utils/types";
import { baseApi } from "./baseApi";

const { BACKEND_URL } = config;

console.log("BACKEND_URL", BACKEND_URL);

export const betApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBets: builder.query<Bet[], void>({
      query: () => "/bets",
      transformResponse: (response: GetBetsApiResponse) => {
        return response.data.reverse();
      },
      providesTags: (result = []) => [
        "Bet",
        ...result.map(({ id }) => ({ type: "Bet", id }) as const),
      ],
    }),
    getBetById: builder.query<Bet, string | number>({
      query: (id) => `/bets/${id}`,
      transformResponse: (response: GetBetByIdApiResponse) => response.data,
      providesTags: (_result, _error, id) => [
        { type: "Bet", id },
        { type: "Details", id },
      ],
    }),
    addNewBet: builder.mutation<Bet, Partial<Bet>>({
      query: (newBet) => ({
        url: "/bets",
        method: "POST",
        body: newBet,
      }),
      invalidatesTags: ["Bet"],
    }),
    editBet: builder.mutation<Bet, Partial<Bet>>({
      query: (bet) => ({
        url: `/bets/${bet.id}`,
        method: "PATCH",
        body: bet,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Bet", id }],
    }),
    deleteBet: builder.mutation<{ id: number }, number | string>({
      query: (id) => ({
        url: `/bets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Bet", id }],
    }),
  }),
});

export const {
  useGetBetsQuery,
  useGetBetByIdQuery,
  useAddNewBetMutation,
  useEditBetMutation,
  useDeleteBetMutation,
} = betApiSlice;
