import "./AddBetForm.css";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

import { BetType } from "../../../utils/enums";
import { Bet, BetDetails } from "../../../utils/types";
import { Button } from "../../common/Button";
import {
  BetbuilderInput,
  DateInput,
  FreeLiveInput,
  MatchInput,
  OddsInput,
  SelectionInput,
  TypeInput,
} from "../betInputs";
import { getInputValue, initialBetDetailValues } from "../betUtils";

type AddBetFormProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  modifyIndex: number | null;
  setModifyIndex: Dispatch<SetStateAction<number | null>>;
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
    initialBetDetailValues,
  );

  // Checks what bet to modify
  useEffect(() => {
    if (modifyIndex !== null) {
      setAddBetDetails(myBet.betDetails[modifyIndex]);
    }
  }, [modifyIndex, myBet.betDetails]);

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

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAddBetDetails((bet) => ({
      ...bet,
      [e.target.name]: e.target.value,
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

  console.log("addbetdetails", addBetDetails);

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
        <TypeInput
          handleSelectChange={handleSelectChange}
          details={addBetDetails}
        />
        <FreeLiveInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          modifyIndex={modifyIndex}
          disabled={disabled}
        />
        {addBetDetails.bet_type === BetType.BetBuilder ? (
          <BetbuilderInput
            handleBetInput={handleBetInput}
            details={addBetDetails}
            setDetails={setAddBetDetails}
            modifyIndex={modifyIndex}
            disabled={disabled}
          />
        ) : (
          <SelectionInput
            handleBetInput={handleBetInput}
            details={addBetDetails}
            setDetails={setAddBetDetails}
            modifyIndex={modifyIndex}
            disabled={disabled}
          />
        )}
        <OddsInput
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
        <div className="add-bet-buttons">
          <Button
            children="Continue"
            type="submit"
            className="btn btn-filled button-font-1rem"
            disabled={disabled}
          />
          <Button
            children="Cancel"
            type="button"
            className="btn outline-btn button-font-1rem"
            onClick={handleCancel}
            disabled={disabled}
          />
        </div>
      </form>
    </div>
  );
};
