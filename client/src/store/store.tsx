import { configureStore } from "@reduxjs/toolkit";

import { betReducer, modalReducer } from "../features";
import { betApiSlice } from "../features/api/betsApiSlice";
import { sidebarReducer } from "../reducers";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    sidebar: sidebarReducer,
    bets: betReducer,
    // bets: betReducer,
    [betApiSlice.reducerPath]: betApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(betApiSlice.middleware),
  devTools: import.meta.env.NODE_ENV !== "production",
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
