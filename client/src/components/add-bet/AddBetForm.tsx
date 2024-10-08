import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { Button } from "../index";
import {
  MatchInput,
  DateInput,
  FreeLiveInput,
  SelectionInput,
  OddsInput,
  NotesInput,
} from "./betInputs";
import { Bet, BetDetails } from "../../utils/types";
import { getInputValue, initialBetDetailValues } from "./betUtils";

type AddBetFormProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  modifyIndex: number | null;
  setModifyIndex: Dispatch<React.SetStateAction<number | null>>;
  disabled: boolean;
};

export const AddBetForm = ({
  myBet,
  setMyBet,
  modifyIndex,
  setModifyIndex,
  disabled,
}: AddBetFormProps) => {
  const [addBetDetails, setAddBetDetails] = useState<BetDetails>(
    initialBetDetailValues
  );

  useEffect(() => {
    if (modifyIndex !== null) {
      setAddBetDetails(myBet.betDetails[modifyIndex]);
    }
  }, [modifyIndex, myBet.betDetails]);

  // Handles all types of bet inputs
  const handleBetInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const inputValue = getInputValue(type, checked, value);
    setAddBetDetails((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleMyBet = (e: SyntheticEvent) => {
    e.preventDefault();

    if (modifyIndex !== null) {
      // Modify existing bet
      setMyBet((prev) => {
        const updatedBetDetails = [...prev.betDetails];
        updatedBetDetails[modifyIndex] = addBetDetails;
        return { ...prev, betDetails: updatedBetDetails };
      });
      setModifyIndex(null);
    } else {
      setMyBet((prev) => ({
        ...prev,
        betDetails: [...prev.betDetails, addBetDetails],
      }));
    }

    setAddBetDetails(initialBetDetailValues);

    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const handleCancel = () => {
    if (myBet.betDetails.length > 1) {
      myBet.betDetails.pop();
    }
    setAddBetDetails(initialBetDetailValues);
    setModifyIndex(null);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="addbet-container">
      <h3 className="container-header">Add Bet</h3>
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
            children="Continue"
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
