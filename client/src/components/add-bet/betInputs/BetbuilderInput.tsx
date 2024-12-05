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

    // Simple error handling
    if (!newSelection.trim()) return;
    if (selections.includes(newSelection)) return;

    setSelections([...selections, newSelection]);
    setDetails({
      ...details,
      betbuilder_selection: [...selections, newSelection],
    });

    setNewSelection("");
  };

  const removeSelection = (index: number) => {
    if (!details.betbuilder_selection) return;

    const updatedSelections = details.betbuilder_selection.filter(
      (_, i) => i !== index,
    );

    setSelections(updatedSelections);
    setDetails({
      ...details,
      betbuilder_selection: updatedSelections,
    });
  };

  console.log("builder selections", selections);
  console.log("builder selections length", selections.length);

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
      {details?.betbuilder_selection &&
        details.betbuilder_selection.length > 0 && (
          <BetSelection
            details={details}
            setDetails={setDetails}
            removeSelection={removeSelection}
          />
        )}
    </div>
  );
};
