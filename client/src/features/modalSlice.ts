import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModifyBetState = {
  id?: number | string;
  isOpen: boolean;
};

type ModalState = {
  isModalOpen: boolean;
  isModifyBetModalOpen: ModifyBetState;
};

const initialState: ModalState = {
  isModalOpen: false,
  isModifyBetModalOpen: { id: undefined, isOpen: false },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    isModifyBetModalOpen: (state, action: PayloadAction<ModifyBetState>) => {
      state.isModalOpen = true;
      state.isModifyBetModalOpen = action.payload;
    },
    resetModal: () => initialState,
  },
});

export default modalSlice.reducer;

export const { isModifyBetModalOpen, resetModal } = modalSlice.actions;
