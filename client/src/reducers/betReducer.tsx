import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bet } from "../utils/types";
import { AppDispatch } from "../store/store";
import { betApi } from "../api/betApi";
import { v4 as uuidv4 } from "uuid";
import { initialBetValues } from "../components/add-bet/betUtils";
import { resetModal } from "./modalReducer";

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
    setAllBets: (state, action: PayloadAction<Bet[]>) => {
      state.allBets = action.payload.reverse();
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
    findBet: (state, action: PayloadAction<Bet>) => {
      const betId = action.payload;
      state.betToModify =
        state.allBets.find((bet) => bet.id === betId.id) || null;
    },
    modifiedBet: (state, action: PayloadAction<Bet>) => {
      const modifiedBet = action.payload;
      state.allBets = state.allBets.map((bet) =>
        bet.id === modifiedBet.id ? modifiedBet : bet
      );
    },
    deleteBet: (state, action: PayloadAction<number | string>) => {
      const betId = action.payload;
      state.allBets = state.allBets.filter((bet) => bet.id !== betId);
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

export const changeBetStatus = (bet: Bet) => {
  return async (dispatch: AppDispatch) => {
    try {
      const updatedbet = await betApi.modifyBet(bet);
      dispatch(modifiedBet(updatedbet));
    } catch (error: unknown) {
      console.log("Error changing bet status", error);
    }
  };
};

export const findBetId = (id: number | string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const foundBet = await betApi.findBetById(id);
      dispatch(findBet(foundBet));
    } catch (error: unknown) {
      console.log("Error finding bet", error);
    }
  };
};

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

export const { setAllBets, myBets, newBet, findBet, modifiedBet, deleteBet } =
  betSlice.actions;
export default betSlice.reducer;
