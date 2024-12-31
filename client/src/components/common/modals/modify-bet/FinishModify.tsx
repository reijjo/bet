import "./FinishModify.css";

import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from "react";

import { useEditBetMutation } from "../../../../features/api/betsApiSlice";
import {
  closeConfirmModal,
  openConfirmModal,
  resetModal,
} from "../../../../features/modalSlice";
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
import { Error } from "../../fallback/Error";
import { ModalConfirm } from "../confirm/ModalConfirm";
import { Result } from "./ModifyBetSlip";

type FinishModifyProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  result: Result;
};

export const FinishModify = ({
  myBet,
  setMyBet,
  result,
}: FinishModifyProps) => {
  const [editBet, { isLoading, isError, error }] = useEditBetMutation();
  const { isConfirmModalOpen } = useAppSelector(
    (state: RootState) => state.modal,
  );
  const dispatch = useAppDispatch();

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

  const finishBet = async (e: SyntheticEvent) => {
    e.preventDefault();

    const updatedBet = {
      ...myBet,
      betDetails: myBet.betDetails.map((bet, index) => ({
        ...bet,
        ...result[index],
      })),
    };

    try {
      await editBet(updatedBet).unwrap();

      dispatch(resetModal());
      setMyBet(initialBetValues);
    } catch (error: unknown) {
      console.log("Error Updating bet", error);
    }
  };

  const handleCancel = () => {
    dispatch(closeConfirmModal());
  };

  const deleteBet = (id: number | string) => {
    console.log("delete bet id", id);
    dispatch(openConfirmModal());
  };

  const confirmDelete = () => {
    if (myBet.id) {
      // dispatch(deleteBetbyId(myBet.id));
      // dispatch(resetModal());
      setMyBet(initialBetValues);
    }
  };

  // Returns
  if (isError) return <Error error={error} />;

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
            children={isLoading ? "Saving..." : "Save Changes"}
          />
          <Button
            type="button"
            className="btn btn-delete"
            children="Delete Bet"
            onClick={() => deleteBet(myBet.id as number | string)}
          />
        </div>
      </form>
      {isConfirmModalOpen && (
        <ModalConfirm
          handleCancel={handleCancel}
          handleConfirm={confirmDelete}
        />
      )}
    </>
  );
};
