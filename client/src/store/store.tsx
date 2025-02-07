import { configureStore } from "@reduxjs/toolkit";

import { modalReducer, sidebarReducer } from "../features";
import { baseApi } from "../features/api/baseApi";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    sidebar: sidebarReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: import.meta.env.NODE_ENV !== "production",
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
