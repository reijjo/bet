import "./SelectionInput.css";

import { Dispatch, SetStateAction } from "react";

import { BetDetails, BetInputProps } from "../../../../utils/types";
import { TextInput } from "../../../index";
import { BetSelection } from "../../BetSelection";

interface SelectionInputProps extends BetInputProps {
  setDetails: Dispatch<SetStateAction<BetDetails>>;
}

export const SelectionInput = ({
  handleBetInput,
  details,
  setDetails,
  disabled,
}: SelectionInputProps) => {
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
      />
      {details?.selection && (
        <BetSelection details={details} setDetails={setDetails} />
      )}
    </div>
  );
};
//
