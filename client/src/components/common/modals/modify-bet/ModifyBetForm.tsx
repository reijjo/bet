import "./ModifyBetForm.css";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

import { useScreenWidth } from "../../../../hooks/useScreenWidth";
import { changeBetStatus } from "../../../../reducers/betReducer";
import { useAppDispatch } from "../../../../store/hooks";
import { BetType } from "../../../../utils/enums";
import { validateBetDetailsInputs } from "../../../../utils/inputValidators";
import { Bet, BetDetails } from "../../../../utils/types";
import {
  BetbuilderInput,
  DateInput,
  FreeLiveInput,
  MatchInput,
  OddsInput,
  SelectionInput,
  TypeInput,
} from "../../../add-bet";
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (modifyIndex !== null) {
      setAddBetDetails(myBet.betDetails[modifyIndex]);
    }
  }, [modifyIndex, myBet.betDetails]);

  const dispatch = useAppDispatch();
  const { isTablet, isMobile } = useScreenWidth();

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

  const handleCancel = () => {
    setModifyIndex(null);
  };

  const handleMyBet = (e: SyntheticEvent) => {
    e.preventDefault();

    // Validate fields before submitting
    const validation = validateBetDetailsInputs(addBetDetails);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (modifyIndex !== null) {
      const updatedBetDetails = [...myBet.betDetails];
      updatedBetDetails[modifyIndex] = addBetDetails;
      const updatedBet = { ...myBet, betDetails: updatedBetDetails };
      setMyBet(updatedBet);
      dispatch(changeBetStatus(updatedBet));
      setErrors({});
    }
    handleCancel();
  };

  console.log("BET", myBet);

  return (
    <div className="modifybetform-container">
      <form
        className="addbet-form"
        onSubmit={handleMyBet}
        style={isTablet ? { gridTemplateColumns: "repeat(2, 1fr)" } : {}}
      >
        <MatchInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          modifyIndex={modifyIndex}
          disabled={disabled}
          gridColumn={isTablet || isMobile ? "1 / -1" : "1 / 3"}
          gridRow="1 / 2"
        />
        <DateInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          modifyIndex={modifyIndex}
          disabled={disabled}
          gridRow="2 / 3"
          gridColumn={isTablet || isMobile ? "1 / 2" : "4 / 5"}
        />
        <FreeLiveInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          modifyIndex={modifyIndex}
          disabled={disabled}
          gridColumn={isTablet || isMobile ? "2 / 3" : "4 / 5"}
          gridRow={isTablet || isMobile ? "2 / 3" : "1 / 2"}
        />
        {addBetDetails?.bet_type === BetType.BetBuilder ||
        addBetDetails?.bet_type === BetType.Tuplaus ? (
          <BetbuilderInput
            handleBetInput={handleBetInput}
            details={addBetDetails}
            setDetails={setAddBetDetails}
            modifyIndex={modifyIndex}
            disabled={disabled}
            error={errors}
            setError={setErrors}
            gridColumn={isTablet || isMobile ? "1 / -1" : "1 / 3"}
            gridRow={isTablet || isMobile ? "4 / 5" : "2 / 4"}
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
            gridColumn={isTablet || isMobile ? "1 / -1" : "1 / 3"}
            gridRow={isTablet || isMobile ? "3 / 4" : "2 / 4"}
          />
        )}
        <OddsInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          modifyIndex={modifyIndex}
          disabled={disabled}
          error={errors}
          setError={setErrors}
          gridColumn={isTablet || isMobile ? "1 / 2" : "3 / 4"}
          gridRow={isTablet || isMobile ? "3 / 4" : "2 / 3"}
        />
        <TypeInput
          handleSelectChange={handleSelectChange}
          details={addBetDetails}
          disabled={disabled}
          // modifyIndex={modifyIndex}
          gridColumn={isTablet || isMobile ? "2 / 3" : ""}
          gridRow={isTablet || isMobile ? "3 / 4" : "1 / 2"}
        />

        <div
          className="add-bet-buttons"
          style={isTablet || isMobile ? { gridColumn: "1 / -1" } : {}}
        >
          <Button
            children="Save"
            type="submit"
            className="btn btn-filled"
            disabled={disabled}
          />
          <Button
            children="Cancel"
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
