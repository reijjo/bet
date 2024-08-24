import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bet } from "../utils/types";
import { AppDispatch } from "../store/store";
import { betApi } from "../api/betApi";

type BetState = {
  allBets: Bet[];
  myBets: Bet[];
};

const initialState: BetState = {
  allBets: [],
  myBets: [],
};

export const betSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    setAllBets: (state, action: PayloadAction<Bet[]>) => {
      state.allBets = action.payload;
    },
    myBets: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      state.myBets = state.allBets.filter((bet) => bet.user_id === userId);
    },
  },
});

export const initAllBets = () => {
  return async (dispatch: AppDispatch) => {
    const res = await betApi.getAllBets();
    dispatch(setAllBets(res));
  };
};

export const initMyBets = (id: number) => {
  return async (dispatch: AppDispatch) => {
    // const res = await betApi.getMyBets(id);
    dispatch(myBets(id));
  };
};

export const { setAllBets, myBets } = betSlice.actions;
export default betSlice.reducer;
