import "./OddsInput.css";

import { Dispatch, SetStateAction } from "react";

import { TextInput } from "@components/index";
import { BetInputProps } from "@utils/types";
import { hasInputError } from "./InputError";

interface OddsInputProps extends BetInputProps {
  error?: { [key: string]: string };
  setError: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
  gridRow?: string;
  gridColumn?: string;
}

export const OddsInput = ({
  handleBetInput,
  details,
  disabled,
  error,
  setError,
  gridColumn,
  gridRow,
}: OddsInputProps) => {
  const clearError = () => {
    setError({
      ...error,
      odds: "",
    });
  };

  return (
    <div
      className="odds-input"
      style={{ gridColumn: gridColumn, gridRow: gridRow }}
    >
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
