import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../slices/sidebarSlice";
import betReducer from "../slices/betSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    bets: betReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
