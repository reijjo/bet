import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AppDispatch } from "../store/store";

type ModifyBetState = {
  id?: number | string;
  isOpen: boolean;
};

type ModalState = {
  isModalOpen: boolean;
  isModifyBetModalOpen: ModifyBetState;
  isConfirmModalOpen: boolean;
  isRefreshModalOpen: boolean;
};

const initialState: ModalState = {
  isModalOpen: false,
  isModifyBetModalOpen: { id: undefined, isOpen: false },
  isConfirmModalOpen: false,
  // isRefreshModalOpen: true,
  isRefreshModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    isModifyBetModalOpen: (state, action: PayloadAction<ModifyBetState>) => {
      state.isModalOpen = true;
      state.isModifyBetModalOpen = action.payload;
    },
    confirmModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmModalOpen = action.payload;
    },
    refreshModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isRefreshModalOpen = action.payload;
    },
    resetModal: () => initialState,
  },
});

export default modalSlice.reducer;

export const {
  isModifyBetModalOpen,
  confirmModalOpen,
  refreshModalOpen,
  resetModal,
} = modalSlice.actions;

export const openConfirmModal = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(confirmModalOpen(true));
  };
};

export const closeConfirmModal = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(confirmModalOpen(false));
  };
};
