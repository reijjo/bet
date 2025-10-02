import "./BetBuilderInput.css";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";

import { TextInputWithButton } from "@/components/ui/inputs/TextInputWithButton";
import { BetDetails, BetInputProps } from "@/utils/types";
import { BetSelection } from "../forms";
import { hasInputError } from "./InputError";

interface BetBuilderInputProps extends BetInputProps {
  setDetails: Dispatch<SetStateAction<BetDetails>>;
  error?: { [key: string]: string };
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  gridRow?: string;
  gridColumn?: string;
}

export const BetBuilderInput = ({
  details,
  disabled,
  setDetails,
  error,
  handleFocus,
  handleBlur,
  gridColumn,
  gridRow,
}: BetBuilderInputProps) => {
  const [newSelection, setNewSelection] = useState("");

  const handleSelectionInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSelection(e.target.value);
  };

  // Add selection
  const addSelection = (e: SyntheticEvent) => {
    e.preventDefault();

    // Simple error handling
    if (!newSelection.trim()) return;
    if (details.betbuilder_selection?.includes(newSelection)) return;

    const updatedDetails = [
      ...(details.betbuilder_selection || []),
      newSelection,
    ];

    setDetails({
      ...details,
      betbuilder_selection: updatedDetails,
    });

    setNewSelection("");
  };

  const removeSelection = (index: number) => {
    if (!details.betbuilder_selection) return;

    const updatedSelections = details.betbuilder_selection.filter(
      (_, i) => i !== index
    );

    setDetails({
      ...details,
      betbuilder_selection: updatedSelections,
    });
  };

  return (
    <div
      className="betbuilder-input"
      style={{ gridColumn: gridColumn, gridRow: gridRow }}
    >
      <TextInputWithButton
        className="text-input"
        label="Your Selection"
        type="text"
        placeholder="Lebron o15.5 points"
        id="betbuilder_selection"
        name="betbuilder_selection"
        buttonText="Add"
        width="100%"
        onClick={addSelection}
        onChange={handleSelectionInput}
        value={newSelection}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        errorStyle={!!error?.selection}
      />
      {error?.betbuilder_selection && hasInputError(error.betbuilder_selection)}
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
