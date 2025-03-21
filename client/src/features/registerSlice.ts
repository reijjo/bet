import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialRegisterValues } from "../utils/defaults/defaults";
import { RegisterValues } from "../utils/types";

const initialState: RegisterValues = initialRegisterValues;

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegister: (state, action: PayloadAction<Partial<RegisterValues>>) => {
      return { ...state, ...action.payload };
    },
    resetRegister: () => initialState,
  },
});

export const { setRegister, resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
