import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/store";

type ModalState = {
  modalOpen: boolean;
  addBetModal: boolean;
  testModal: boolean;
  modifyBetModal: boolean;
  betId: string | number;
};

const initialState: ModalState = {
  modalOpen: false,
  addBetModal: false,
  testModal: false,
  modifyBetModal: false,
  betId: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
    addBetModal: (state, action: PayloadAction<boolean>) => {
      state.addBetModal = action.payload;
    },
    addTestModal: (state, action: PayloadAction<boolean>) => {
      state.testModal = action.payload;
    },
    modifyBetModal: (
      state,
      action: PayloadAction<{ modalOpen: boolean; id: string | number }>
    ) => {
      state.modalOpen = true;
      state.modifyBetModal = action.payload.modalOpen;
      state.betId = action.payload.id;
    },
    resetModal: () => initialState,
  },
});

export const openModal = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleModal(true));
  };
};

export const closeModal = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(resetModal());
  };
};

export const openAddBet = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(addBetModal(true));
  };
};

export const openModifyBet = (id: number | string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(modifyBetModal({ modalOpen: true, id }));
  };
};

export const {
  toggleModal,
  addBetModal,
  addTestModal,
  modifyBetModal,
  resetModal,
} = modalSlice.actions;
export default modalSlice.reducer;
