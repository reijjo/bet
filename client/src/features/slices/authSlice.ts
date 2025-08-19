import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { User } from "../utils/types";

export interface Authenticated {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: Authenticated = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const { loginUser, logoutUser } = authSlice.actions;
