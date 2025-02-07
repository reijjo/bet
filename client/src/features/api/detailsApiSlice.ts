import {
  GetBetDetailsApiResponse,
  GetDetailByIdApiResponse,
} from "../../utils/api-response-types";
import { BetDetails } from "../../utils/types";
import { baseApi } from "./baseApi";

export const detailsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBetDetails: builder.query<BetDetails[], number>({
      query: (id) => `/bets/${id}/details`,
      transformResponse: (response: GetBetDetailsApiResponse) => response.data,
      providesTags: (result = []) => [
        "Details",
        ...result.map(({ id }) => ({ type: "Details", id }) as const),
      ],
    }),
    getDetailById: builder.query<BetDetails, number>({
      query: (id) => `/details/${id}`,
      transformResponse: (response: GetDetailByIdApiResponse) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Details", id }],
    }),
    editDetails: builder.mutation<BetDetails, Partial<BetDetails>>({
      query: (details) => ({
        url: `/details/${details.id}`,
        method: "PATCH",
        body: details,
      }),
      invalidatesTags: (_result, _error, { id, bet_id }) => [
        { type: "Details", id },
        { type: "Bet", bet_id },
      ],
    }),
  }),
});

export const {
  useGetBetDetailsQuery,
  useGetDetailByIdQuery,
  useEditDetailsMutation,
} = detailsApiSlice;
