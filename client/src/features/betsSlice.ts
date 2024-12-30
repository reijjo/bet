import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { Bet } from "../utils/types";
import { betApiSlice } from "./api/betsApiSlice";

type BetsState = {
  list: Bet[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

const initialState: BetsState = {
  list: [],
  status: "idle",
  error: null,
};

const betSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        betApiSlice.endpoints.getBets.matchFulfilled,
        (state, action) => {
          state.list = action.payload;
        },
      )
      .addMatcher(
        betApiSlice.endpoints.getBets.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? null;
        },
      );
  },
});

export default betSlice.reducer;

export const findBetById = (state: RootState, id: string | number) =>
  state.bets.list.find((bet) => bet.id === id);
