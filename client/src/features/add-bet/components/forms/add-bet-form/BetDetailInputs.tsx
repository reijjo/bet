import { isBetBuilderType } from "@/pages/add-bet/betUtils";
import {
  BetBuilderInput,
  DateInput,
  FreeLiveInput,
  MatchInput,
  OddsInput,
  SelectionInput,
  TypeInput,
} from "../../add-bet-inputs";
import { BetDetails } from "@/utils";
import { Dispatch, SetStateAction, ChangeEvent, FocusEvent } from "react";

type BetDetailInputs = {
  handleBetInput: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleDetailsSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleFocus: (e: FocusEvent<HTMLInputElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  addBetDetails: BetDetails;
  setAddBetDetails: Dispatch<SetStateAction<BetDetails>>;
  disabled: boolean;
  setErrors: Dispatch<SetStateAction<{ [key: string]: string }>>;
  errors: {
    [key: string]: string;
  };
};

export const BetDetailInputs = ({
  handleBetInput,
  addBetDetails,
  disabled,
  setErrors,
  errors,
  handleFocus,
  handleBlur,
  handleDetailsSelect,
  setAddBetDetails,
}: BetDetailInputs) => {
  return (
    <>
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
    </>
  );
};
