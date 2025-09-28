import "./SelectionInput.css";

import { Dispatch, SetStateAction } from "react";

import { TextInput } from "@/components/index";
import { BetDetails, BetInputProps } from "@/utils/types";
import { BetSelection } from "../forms/add-bet-form/BetSelection";
import { hasInputError } from "./InputError";

interface SelectionInputProps extends BetInputProps {
  setDetails: Dispatch<SetStateAction<BetDetails>>;
  error?: { [key: string]: string };
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  gridRow?: string;
  gridColumn?: string;
}

export const SelectionInput = ({
  handleBetInput,
  details,
  setDetails,
  disabled,
  error,
  handleBlur,
  handleFocus,
  gridColumn,
  gridRow,
}: SelectionInputProps) => {
  return (
    <div
      className="selection-input"
      style={{ gridColumn: gridColumn, gridRow: gridRow }}
    >
      <TextInput
        className="text-input"
        label="Selection"
        type="text"
        placeholder="Timberwolves -4.5"
        id="selection"
        name="selection"
        onChange={handleBetInput}
        value={details.selection}
        disabled={disabled}
        errorStyle={!!error?.selection}
        handleBlur={handleBlur}
        handleFocus={handleFocus}
      />
      {error?.selection && hasInputError(error.selection)}
      {details?.selection && (
        <BetSelection details={details} setDetails={setDetails} />
      )}
    </div>
  );
};
//
