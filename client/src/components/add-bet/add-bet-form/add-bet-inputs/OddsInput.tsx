import "./OddsInput.css";

import { Dispatch, SetStateAction } from "react";

import { hasInputError } from "../../../../utils/inputValidators";
import { BetInputProps } from "../../../../utils/types";
import { TextInput } from "../../../index";

interface OddsInputProps extends BetInputProps {
  error?: { [key: string]: string };

  setError: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
}

export const OddsInput = ({
  handleBetInput,
  details,
  disabled,
  error,
  setError,
}: OddsInputProps) => {
  const clearError = () => {
    setError({
      ...error,
      odds: "",
    });
  };

  return (
    <div className="odds-input">
      <TextInput
        className="text-input"
        label="Odds"
        optional="decimal"
        type="text"
        placeholder="1.91"
        id="odds"
        name="odds"
        onChange={handleBetInput}
        value={details.odds}
        disabled={disabled}
        onFocus={clearError}
        errorStyle={!!error?.odds}
      />
      {error?.odds && hasInputError(error.odds)}
    </div>
  );
};
