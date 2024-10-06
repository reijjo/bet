import { configureStore } from "@reduxjs/toolkit";
import { modalReducer, sidebarReducer, betReducer } from "../reducers";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    sidebar: sidebarReducer,
    bets: betReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
