import "./AddBetForm.css";

import { Dispatch, SetStateAction, SyntheticEvent, useEffect } from "react";

import { useAddBetForm } from "@hooks/useAddBetForm";
import {
  initialBetDetailValues,
  scrollDown,
  validateBetDetailsInputs,
} from "@/utils";

import { Bet } from "@utils/types";
import { isBetBuilderType } from "@pages/add-bet/betUtils";
import {
  DateInput,
  FreeLiveInput,
  MatchInput,
  OddsInput,
  SelectionInput,
  TypeInput,
  BetBuilderInput,
} from "../../add-bet-inputs";
import { Button2 } from "@/components";

type AddBetDetailsFormProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  modifyIndex: number | null;
  setModifyIndex: Dispatch<SetStateAction<number | null>>;
  disabled: boolean;
};

export const AddBetDetailsForm = ({
  myBet,
  setMyBet,
  modifyIndex,
  setModifyIndex,
  disabled,
}: AddBetDetailsFormProps) => {
  const {
    addBetDetails,
    setAddBetDetails,
    errors,
    setErrors,
    handleBetInput,
    handleDetailsSelect,
    handleBlur,
    handleFocus,
  } = useAddBetForm();

  // Checks what bet to modify
  useEffect(() => {
    if (modifyIndex !== null) {
      setAddBetDetails(myBet.betDetails[modifyIndex]);
    }
  }, [setAddBetDetails, modifyIndex, myBet.betDetails]);

  const handleMyBet = (e: SyntheticEvent) => {
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

  // TODO: Add different input field for tulosveto and moniveto

  return (
    <div className="addbet-container">
      <h3 className="container-header">Add Bet</h3>
      <form
        className="addbet-form"
        data-testid="addbet-form"
        onSubmit={handleMyBet}
      >
        <MatchInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          disabled={disabled}
          error={errors}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
        />
        <TypeInput
          handleSelectChange={handleDetailsSelect}
          details={addBetDetails}
          disabled={disabled}
        />
        <FreeLiveInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          disabled={disabled}
        />
        {isBetBuilderType(addBetDetails.bet_type) ? (
          <BetBuilderInput
            handleBetInput={handleBetInput}
            details={addBetDetails}
            setDetails={setAddBetDetails}
            disabled={disabled}
            error={errors}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
          />
        ) : (
          <SelectionInput
            handleBetInput={handleBetInput}
            details={addBetDetails}
            setDetails={setAddBetDetails}
            disabled={disabled}
            error={errors}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
          />
        )}
        <OddsInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          disabled={disabled}
          error={errors}
          setError={setErrors}
          // handleFocus={handleFocus}
          // handleBlur={handleBlur}
        />
        <DateInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          disabled={disabled}
        />
        <div className="add-bet-buttons">
          <Button2 type="submit" className="btn2-cta" disabled={disabled}>
            Continue
          </Button2>
          <Button2
            type="button"
            className="btn2-outline"
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancel
          </Button2>
        </div>
      </form>
    </div>
  );
};
