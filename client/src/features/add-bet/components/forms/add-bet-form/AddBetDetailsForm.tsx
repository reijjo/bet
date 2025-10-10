import "./AddBetDetailsForm.css";

import { Dispatch, SetStateAction, SyntheticEvent, useEffect } from "react";

import { useAddBetForm } from "@features/add-bet/hooks/useAddBetForm";
import { initialBetDetailValues, validateBetDetailsInputs } from "@/utils";

import { Bet } from "@utils/types";

import { Button2 } from "@/components";
import { BetDetailInputs } from "./BetDetailInputs";

type AddBetDetailsFormProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  modifyId: number | null;
  setModifyId: Dispatch<SetStateAction<number | null>>;
  disabled: boolean;
};

export const AddBetDetailsForm = ({
  myBet,
  setMyBet,
  modifyId,
  setModifyId,
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
    if (modifyId !== null) {
      const betToModify = myBet.betDetails.find((bet) => bet.id === modifyId);
      if (betToModify) setAddBetDetails(betToModify);
    }
  }, [setAddBetDetails, modifyId, myBet.betDetails]);

  // Adds/modifies bet
  const handleMyBet = (e: SyntheticEvent) => {
    e.preventDefault();

    // Validate fields before submitting
    const validation = validateBetDetailsInputs(addBetDetails);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const detailsToSave = {
      ...addBetDetails,
      id: addBetDetails.id || Date.now(),
    };

    setMyBet((prev) => ({
      ...prev,
      betDetails:
        modifyId !== null
          ? prev.betDetails.map((bet) =>
              bet.id === modifyId ? detailsToSave : bet
            )
          : [...prev.betDetails, detailsToSave],
    }));

    setErrors({});
    setAddBetDetails(initialBetDetailValues);
    setModifyId(null);
  };

  const handleCancel = () => {
    if (myBet.betDetails.length > 1) {
      myBet.betDetails.pop();
    }
    setAddBetDetails(initialBetDetailValues);
    setModifyId(null);
  };

  return (
    <div className={`addbet-container ${disabled ? "hidden" : ""}`}>
      <h3 className="container-header">Add Bet</h3>
      <form
        className="addbet-form"
        data-testid="addbet-form"
        onSubmit={handleMyBet}
      >
        <BetDetailInputs
          handleBetInput={handleBetInput}
          addBetDetails={addBetDetails}
          disabled={disabled}
          setErrors={setErrors}
          errors={errors}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          handleDetailsSelect={handleDetailsSelect}
          setAddBetDetails={setAddBetDetails}
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
