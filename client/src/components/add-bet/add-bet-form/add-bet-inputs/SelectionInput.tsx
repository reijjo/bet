import "./SelectionInput.css";

import { Dispatch, SetStateAction } from "react";

import { hasInputError } from "../../../../utils/inputValidators";
import { BetDetails, BetInputProps } from "../../../../utils/types";
import { TextInput } from "../../../index";
import { BetSelection } from "../BetSelection";

interface SelectionInputProps extends BetInputProps {
  setDetails: Dispatch<SetStateAction<BetDetails>>;
  error?: { [key: string]: string };
  setError: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
}

export const SelectionInput = ({
  handleBetInput,
  details,
  setDetails,
  disabled,
  error,
  setError,
}: SelectionInputProps) => {
  const clearError = () => {
    setError({
      ...error,
      selection: "",
    });
  };

  return (
    <div className="selection-input">
      <TextInput
        className="text-input"
        label="Selection"
        type="text"
        placeholder="e.g. TImberwolves -4.5"
        id="selection"
        name="selection"
        onChange={handleBetInput}
        value={details.selection}
        disabled={disabled}
        onFocus={clearError}
        errorStyle={!!error?.selection}
      />
      {error?.selection && hasInputError(error.selection)}
      {details?.selection && (
        <BetSelection details={details} setDetails={setDetails} />
      )}
    </div>
  );
};
//
