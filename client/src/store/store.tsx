import { configureStore } from "@reduxjs/toolkit";

import { betReducer, modalReducer, sidebarReducer } from "../features";
import { betApiSlice } from "../features/api/betsApiSlice";
import { detailsApiSlice } from "../features/api/detailsApiSlice";
import { sportsApiSlice } from "../features/api/sportApiSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    sidebar: sidebarReducer,
    bets: betReducer,
    [betApiSlice.reducerPath]: betApiSlice.reducer,
    [sportsApiSlice.reducerPath]: sportsApiSlice.reducer,
    [detailsApiSlice.reducerPath]: detailsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(betApiSlice.middleware)
      .concat(sportsApiSlice.middleware)
      .concat(detailsApiSlice.middleware),
  devTools: import.meta.env.NODE_ENV !== "production",
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
