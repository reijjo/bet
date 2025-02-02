import "./SelectionInput.css";

import { Dispatch, SetStateAction } from "react";

import { TextInput } from "../../../../components/index";
import { hasInputError } from "../../../../utils/inputValidators";
import { BetDetails, BetInputProps } from "../../../../utils/types";
import { BetSelection } from "../BetSelection";

interface SelectionInputProps extends BetInputProps {
  setDetails: Dispatch<SetStateAction<BetDetails>>;
  error?: { [key: string]: string };
  setError: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;

  gridRow?: string;
  gridColumn?: string;
}

export const SelectionInput = ({
  handleBetInput,
  details,
  setDetails,
  disabled,
  error,

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
        placeholder="e.g. TImberwolves -4.5"
        id="selection"
        name="selection"
        onChange={handleBetInput}
        value={details.selection}
        disabled={disabled}
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
