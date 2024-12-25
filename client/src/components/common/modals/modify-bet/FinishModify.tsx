import "./FinishModify.css";

import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from "react";

import {
  changeBetStatus,
  deleteBetbyId,
} from "../../../../reducers/betReducer";
import {
  openConfirmModal,
  resetModal,
} from "../../../../reducers/modalReducer";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { RootState } from "../../../../store/store";
import { Bet } from "../../../../utils/types";
import {
  BookmakerInput,
  NotesInput,
  SportInput,
  TipperInput,
} from "../../../add-bet";
import { initialBetValues } from "../../../add-bet/betUtils";
import { Button } from "../../button/Button";
import { ModalConfirm } from "../confirm/ModalConfirm";
import { Result } from "./ModifyBetSlip";

type FinishModifyProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  modifyIndex: number | null;
  setModifyIndex: Dispatch<React.SetStateAction<number | null>>;
  result: Result;
};

export const FinishModify = ({
  myBet,
  setMyBet,
  result,
}: FinishModifyProps) => {
  const dispatch = useAppDispatch();
  const { confirmModal } = useAppSelector((state: RootState) => state.modal);

  console.log("confirmmoä", confirmModal);

  const handleTextInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setMyBet((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMyBet((myBet) => ({
      ...myBet,
      [e.target.name]: e.target.value,
    }));
  };

  const finishBet = (e: SyntheticEvent) => {
    e.preventDefault();

    const updatedBet = {
      ...myBet,
      betDetails: myBet.betDetails.map((bet, index) => ({
        ...bet,
        ...result[index],
      })),
    };

    dispatch(changeBetStatus(updatedBet));
    dispatch(resetModal());
    setMyBet(initialBetValues);
  };

  const handleCancel = () => {
    dispatch(resetModal());
  };

  const deleteBet = (id: number | string) => {
    console.log("delete bet id", id);
    dispatch(openConfirmModal(id));
  };

  const confirmDelete = () => {
    if (myBet.id) {
      dispatch(deleteBetbyId(myBet.id));
      dispatch(resetModal());
      setMyBet(initialBetValues);
    }
  };

  return (
    <>
      <form className="finish-modifybet-form" onSubmit={finishBet}>
        <SportInput onChange={handleSelectChange} value={myBet.sport} />
        <BookmakerInput onChange={handleSelectChange} value={myBet.bookmaker} />
        <TipperInput onChange={handleTextInput} value={myBet.tipper} />
        <NotesInput onChange={handleTextInput} value={myBet.notes ?? ""} />

        <div className="finish-modifybet-buttons">
          <Button
            type="submit"
            className="btn btn-filled"
            children="Save Changes"
          />
          <Button
            type="button"
            className="btn btn-delete"
            children="Delete Bet"
            onClick={() => deleteBet(myBet.id as number | string)}
          />
        </div>
      </form>
      {confirmModal && (
        <ModalConfirm
          handleCancel={handleCancel}
          handleConfirm={confirmDelete}
        />
      )}
    </>
  );
};
