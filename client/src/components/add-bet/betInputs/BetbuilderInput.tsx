import "./BetBuilderInput.css";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";

// import { useState } from "react";
import { BetDetails, BetInputProps } from "../../../utils/types";
import { TextInputWithButton } from "../../common/inputs/TextInputWithButton";
import { BetSelection } from "../BetSelection";

interface BetbuilderInputProps extends BetInputProps {
  setDetails: Dispatch<SetStateAction<BetDetails>>;
}

export const BetbuilderInput = ({
  details,
  disabled,
  setDetails,
}: BetbuilderInputProps) => {
  const [newSelection, setNewSelection] = useState("");
  const [selections, setSelections] = useState<string[]>([]);

  const handleSelectionInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSelection(e.target.value);
  };

  // Add selection
  const addSelection = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!newSelection.trim()) return;

    setSelections([...selections, newSelection]);
    setDetails({
      ...details,
      betbuilder_selection: [...selections, newSelection],
    });

    setNewSelection("");
  };

  console.log("builder selections", selections);

  return (
    <div className="betbuilder-input">
      <TextInputWithButton
        className="text-input"
        label="Bet Builder Selections"
        type="text"
        placeholder="e.g. Lebron o15.5 points"
        id="betbuilder_selection"
        name="betbuilder_selection"
        buttonText="Add"
        onClick={addSelection}
        onChange={handleSelectionInput}
        value={newSelection}
        disabled={disabled}
      />
      {details?.betbuilder_selection && (
        <BetSelection details={details} setDetails={setDetails} />
      )}
    </div>
  );
};
