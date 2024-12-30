import "./AddBetForm.css";

import { Dispatch, SetStateAction, SyntheticEvent, useEffect } from "react";

import {
  BetbuilderInput,
  DateInput,
  FreeLiveInput,
  MatchInput,
  OddsInput,
  SelectionInput,
  TypeInput,
} from "..";
import { useAddBetForm } from "../../../hooks/useAddBetForm";
import { scrollDown } from "../../../utils/helperFunctions";
import { validateBetDetailsInputs } from "../../../utils/inputValidators";
import { Bet } from "../../../utils/types";
import { Button } from "../../common/button/Button";
import { initialBetDetailValues, isBetBuilderType } from "../betUtils";

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
  const {
    addBetDetails,
    setAddBetDetails,
    errors,
    setErrors,
    handleBetInput,
    handleSelectChange,
  } = useAddBetForm();

  // Checks what bet to modify
  useEffect(() => {
    if (modifyIndex !== null) {
      setAddBetDetails(myBet.betDetails[modifyIndex]);
    }
  }, [setAddBetDetails, modifyIndex, myBet.betDetails]);

  const handleBetSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Validate fields before submitting
    const validation = validateBetDetailsInputs(addBetDetails);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

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

    setErrors({});
    setAddBetDetails(initialBetDetailValues);
    scrollDown();
  };

  const handleCancel = () => {
    if (myBet.betDetails.length > 1) {
      myBet.betDetails.pop();
    }
    setAddBetDetails(initialBetDetailValues);
    setModifyIndex(null);

    scrollDown();
  };

  console.log("addbetdetails", addBetDetails);
  console.log("errors", errors);

  // TODO: Add different input field for tulosveto and moniveto
  // TODO2: Add moneyline bettype?a<§
  // TODO3: Add betbuilder input in ladderchallenge

  return (
    <div className="addbet-container">
      <h3 className="container-header">Add Bet</h3>
      <form className="addbet-form" onSubmit={handleBetSubmit}>
        <MatchInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          modifyIndex={modifyIndex}
          disabled={disabled}
        />
        <TypeInput
          handleSelectChange={handleSelectChange}
          details={addBetDetails}
          disabled={disabled}
          // modifyIndex={modifyIndex}
        />
        <FreeLiveInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          modifyIndex={modifyIndex}
          disabled={disabled}
        />
        {isBetBuilderType(addBetDetails.bet_type) ? (
          <BetbuilderInput
            handleBetInput={handleBetInput}
            details={addBetDetails}
            setDetails={setAddBetDetails}
            disabled={disabled}
            error={errors}
            setError={setErrors}
          />
        ) : (
          <SelectionInput
            handleBetInput={handleBetInput}
            details={addBetDetails}
            setDetails={setAddBetDetails}
            modifyIndex={modifyIndex}
            disabled={disabled}
            error={errors}
            setError={setErrors}
          />
        )}
        <OddsInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          modifyIndex={modifyIndex}
          disabled={disabled}
          error={errors}
          setError={setErrors}
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
            className="btn btn-filled"
            disabled={disabled}
          />
          <Button
            children="Clear fields"
            type="button"
            className="btn btn-outline"
            onClick={handleCancel}
            disabled={disabled}
          />
        </div>
      </form>
    </div>
  );
};
