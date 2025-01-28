import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { betApi } from "../api/betApi";
import { resetModal } from "../features/modalSlice";
import { initialBetValues } from "../pages/add-bet/betUtils";
import { AppDispatch } from "../store/store";
import { Bet } from "../utils/types";

type BetState = {
  allBets: Bet[];
  myBets: Bet[];
  newBet: Bet;
  betToModify: Bet | null;
};

const initialState: BetState = {
  allBets: [],
  myBets: [],
  newBet: initialBetValues,
  betToModify: null,
};

export const betSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    modifiedBet: (state, action: PayloadAction<Bet>) => {
      const modifiedBet = action.payload;
      state.allBets = state.allBets.map((bet) =>
        bet.id === modifiedBet.id ? modifiedBet : bet,
      );
    },
    deleteBet: (state, action: PayloadAction<number | string>) => {
      const betId = action.payload;
      state.allBets = state.allBets.filter((bet) => bet.id !== betId);
    },
  },
});

export const deleteBetbyId = (id: number | string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await betApi.deleteBet(id);
      dispatch(deleteBet(id));
      dispatch(resetModal());
    } catch (error: unknown) {
      console.log("Error deleting bet", error);
    }
  };
};

export const { modifiedBet, deleteBet } = betSlice.actions;
export default betSlice.reducer;
