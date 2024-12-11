import "./ModifyBetForm.css";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

import { changeBetStatus } from "../../../../reducers/betReducer";
import { useAppDispatch } from "../../../../store/hooks";
import { Bet, BetDetails } from "../../../../utils/types";
import {
  DateInput,
  FreeLiveInput,
  MatchInput,
  OddsInput,
  SelectionInput,
} from "../../../add-bet/betInputs";
import { NotesInput } from "../../../add-bet/betInputs/NotesInput";
import {
  getInputValue,
  initialBetDetailValues,
} from "../../../add-bet/betUtils";
import { Button } from "../../Button";

type ModifyBetFormProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  modifyIndex: number | null;
  setModifyIndex: Dispatch<React.SetStateAction<number | null>>;
  disabled: boolean;
};

export const ModifyBetForm = ({
  myBet,
  setMyBet,
  modifyIndex,
  setModifyIndex,
  disabled,
}: ModifyBetFormProps) => {
  const [addBetDetails, setAddBetDetails] = useState<BetDetails>(
    initialBetDetailValues,
  );

  useEffect(() => {
    if (modifyIndex !== null) {
      setAddBetDetails(myBet.betDetails[modifyIndex]);
    }
  }, [modifyIndex, myBet.betDetails]);

  const dispatch = useAppDispatch();

  // Handles all types of bet inputs
  const handleBetInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const inputValue = getInputValue(type, checked, value);
    setAddBetDetails((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleCancel = () => {
    setModifyIndex(null);
  };

  const handleMyBet = (e: SyntheticEvent) => {
    e.preventDefault();

    if (modifyIndex !== null) {
      const updatedBetDetails = [...myBet.betDetails];
      updatedBetDetails[modifyIndex] = addBetDetails;
      const updatedBet = { ...myBet, betDetails: updatedBetDetails };
      setMyBet(updatedBet);
      dispatch(changeBetStatus(updatedBet));
    }
    handleCancel();
  };

  console.log("BET", myBet);

  return (
    <div className="modifybetform-container">
      <form className="addbet-form" onSubmit={handleMyBet}>
        <MatchInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          modifyIndex={modifyIndex}
          disabled={disabled}
        />
        <DateInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          modifyIndex={modifyIndex}
          disabled={disabled}
        />
        <FreeLiveInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          modifyIndex={modifyIndex}
          disabled={disabled}
        />
        <SelectionInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          modifyIndex={modifyIndex}
          disabled={disabled}
        />
        <OddsInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          modifyIndex={modifyIndex}
          disabled={disabled}
        />
        <NotesInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          modifyIndex={modifyIndex}
          disabled={disabled}
        />
        <div className="add-bet-buttons">
          <Button
            children="Save"
            type="submit"
            className="btn big-btn-style"
            style={{ fontSize: "1.25em" }}
            disabled={disabled}
          />
          <Button
            children="Cancel"
            type="button"
            className="btn outline-btn"
            style={{ fontSize: "1.25em" }}
            onClick={handleCancel}
            disabled={disabled}
          />
        </div>
      </form>
    </div>
  );
};
