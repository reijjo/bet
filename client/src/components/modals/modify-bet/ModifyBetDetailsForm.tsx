import "./ModifyBetDetailsForm.css";

import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

import { Button, Error, Loading } from "../../";
import { useEditDetailsMutation } from "../../../features/api/detailsApiSlice";
import { useAddBetForm } from "../../../hooks/useAddBetForm";
import { useScreenWidth } from "../../../hooks/useScreenWidth";
import {
  BetbuilderInput,
  DateInput,
  FreeLiveInput,
  MatchInput,
  OddsInput,
  SelectionInput,
  TypeInput,
} from "../../../pages/add-bet";
import { isBetBuilderType } from "../../../pages/add-bet/betUtils";
import { validateBetDetailsInputs } from "../../../utils/inputValidators";
import { Bet } from "../../../utils/types";

type ModifyBetFormProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  modifyIndex: number | null;
  setModifyIndex: Dispatch<React.SetStateAction<number | null>>;
  disabled: boolean;
};

export const ModifyBetDetailsForm = ({
  myBet,
  modifyIndex,
  setModifyIndex,
  disabled,
}: ModifyBetFormProps) => {
  const {
    handleBetInput,
    handleSelectChange,
    addBetDetails,
    setAddBetDetails,
  } = useAddBetForm();
  const [updateDetails, { isLoading, isError, error }] =
    useEditDetailsMutation();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (modifyIndex !== null) {
      setAddBetDetails(myBet.betDetails[modifyIndex]);
    }
  }, [modifyIndex, myBet.betDetails, setAddBetDetails]);

  const { isTablet, isMobile } = useScreenWidth();

  const handleCancel = () => {
    setModifyIndex(null);
  };

  // Updates the bet details
  const handleMyBet = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Validate fields before submitting
    const validation = validateBetDetailsInputs(addBetDetails);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (modifyIndex !== null) {
      try {
        await updateDetails(addBetDetails).unwrap();
        setErrors({});
        handleCancel();
      } catch (error: unknown) {
        console.log("Error updating bet", error);
      }
    }
  };

  console.log("addBetDetails", addBetDetails);

  // Returns
  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

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
          disabled={disabled}
          gridColumn={isTablet || isMobile ? "1 / -1" : "1 / 3"}
          gridRow="1 / 2"
        />
        <DateInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          disabled={disabled}
          gridRow="2 / 3"
          gridColumn={isTablet || isMobile ? "1 / 2" : "4 / 5"}
        />
        <FreeLiveInput
          handleBetInput={handleBetInput}
          details={addBetDetails}
          disabled={disabled}
          gridColumn={isTablet || isMobile ? "2 / 3" : "4 / 5"}
          gridRow={isTablet || isMobile ? "2 / 3" : "1 / 2"}
        />
        {isBetBuilderType(addBetDetails?.bet_type) ? (
          <BetbuilderInput
            handleBetInput={handleBetInput}
            details={addBetDetails}
            setDetails={setAddBetDetails}
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
          gridColumn={isTablet || isMobile ? "2 / 3" : ""}
          gridRow={isTablet || isMobile ? "3 / 4" : "1 / 2"}
        />

        <div
          className="add-bet-buttons"
          style={isTablet || isMobile ? { gridColumn: "1 / -1" } : {}}
        >
          <Button
            children={isLoading ? "Saving..." : "Save"}
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
