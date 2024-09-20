import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/store";

type ModalState = {
  modalOpen: boolean;
};

const initialState: ModalState = {
  modalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
  },
});

export const openModal = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleModal(true));
  };
};

export const closeModal = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleModal(false));
  };
};

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
