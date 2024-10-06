import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/store";

type SidebarState = {
  sidebar: boolean;
};

const initialState: SidebarState = {
  sidebar: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebar = action.payload;
    },
  },
});

export const openSidebar = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleSidebar(true));
  };
};

export const closeSidebar = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleSidebar(false));
  };
};

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
