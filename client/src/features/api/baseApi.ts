import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { config } from "../../utils/config";

const { BACKEND_URL } = config;

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api`,
    credentials: "include",
  }),
  endpoints: () => ({}),
  tagTypes: ["Bet", "Details", "Session"],
});
