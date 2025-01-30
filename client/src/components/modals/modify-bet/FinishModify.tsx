import "./FinishModify.css";

import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from "react";

import { Button } from "../../";
import { Error } from "../../";
import {
  useDeleteBetMutation,
  useEditBetMutation,
} from "../../../features/api/betsApiSlice";
import {
  closeConfirmModal,
  openConfirmModal,
  resetModal,
} from "../../../features/modalSlice";
import {
  BookmakerInput,
  NotesInput,
  SportInput,
  TipperInput,
} from "../../../pages/add-bet";
import { getFinalBetType } from "../../../pages/add-bet/betUtils";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { initialBetValues } from "../../../utils/defaults";
import { Bet } from "../../../utils/types";
import { ModalConfirm } from "../confirm/ModalConfirm";
import { Result } from "./ModifyBetSlip";
import { StatusChange } from "./StatusChange";

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
  const [
    editBet,
    { isLoading: isEditing, isError: editError, error: editErrorDetails },
  ] = useEditBetMutation();
  const [
    deleteBet,
    { isLoading: isDeleting, isError: deleteError, error: deleteErrorDetails },
  ] = useDeleteBetMutation();
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
    const finalType = getFinalBetType(myBet.betDetails);

    const updatedBet = {
      ...myBet,
      bet_final_type: finalType,
      betDetails: myBet.betDetails.map((bet) => ({
        ...bet,
        ...result[Number(bet.id)],
      })),
    };

    console.log("UPDATEDBET", updatedBet);

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

  const deletingBet = (id: number | string) => {
    if (!id) return;
    dispatch(openConfirmModal());
  };

  const confirmDelete = async () => {
    if (!myBet.id) return;
    try {
      dispatch(resetModal());
      await deleteBet(myBet.id).unwrap();
      setMyBet(initialBetValues);
    } catch (error: unknown) {
      console.error("Error deleting bet", error);
    }
  };

  // Returns
  if (editError) return <Error error={editErrorDetails} />;
  if (deleteError) return <Error error={deleteErrorDetails} />;

  return (
    <>
      <form className="finish-modifybet-form" onSubmit={finishBet}>
        <SportInput onChange={handleSelectChange} value={myBet.sport} />
        <BookmakerInput onChange={handleSelectChange} value={myBet.bookmaker} />
        <TipperInput onChange={handleTextInput} value={myBet.tipper} />
        <NotesInput onChange={handleTextInput} value={myBet.notes ?? ""} />
        <StatusChange bet={myBet} setMyBet={setMyBet} />

        <div className="finish-modifybet-buttons">
          <Button
            type="submit"
            className="btn btn-filled"
            children={isEditing ? "Saving..." : "Save Changes"}
          />
          <Button
            type="button"
            className="btn btn-delete"
            children={isDeleting ? "Deleting..." : "Delete Bet"}
            onClick={() => deletingBet(String(myBet.id))}
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
