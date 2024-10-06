import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bet } from "../utils/types";
import { AppDispatch } from "../store/store";
import { betApi } from "../api/betApi";
import { v4 as uuidv4 } from "uuid";
import { initialBetValues } from "../components/add-bet/betUtils";

type BetState = {
  allBets: Bet[];
  myBets: Bet[];
  newBet: Bet;
};

const initialState: BetState = {
  allBets: [],
  myBets: [],
  newBet: initialBetValues,
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
    newBet: (state, action: PayloadAction<Bet>) => {
      const betId = uuidv4();
      const userId = 1;
      state.newBet = {
        ...action.payload,
        id: betId,
        user_id: userId,
      };
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

export const addNewBet = (bet: Bet) => {
  return async (dispatch: AppDispatch) => {
    try {
      const savedBet = await betApi.addBet(bet);
      dispatch(newBet(savedBet));
    } catch (error: unknown) {
      console.log("Error adding new bet", error);
    }
    dispatch(newBet(bet));
  };
};

export const { setAllBets, myBets, newBet } = betSlice.actions;
export default betSlice.reducer;
