import "./BetBuilderInput.css";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";

import { useScreenWidth } from "../../../../hooks/useScreenWidth";
import { hasInputError } from "../../../../utils/inputValidators";
import { BetDetails, BetInputProps } from "../../../../utils/types";
import { TextInputWithButton } from "../../../common/inputs/TextInputWithButton";
import { BetSelection } from "../BetSelection";

interface BetbuilderInputProps extends BetInputProps {
  setDetails: Dispatch<SetStateAction<BetDetails>>;
  error?: { [key: string]: string };
  setError: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
}

export const BetbuilderInput = ({
  details,
  disabled,
  setDetails,
  error,
  setError,
}: BetbuilderInputProps) => {
  const [newSelection, setNewSelection] = useState("");
  const { isTablet } = useScreenWidth();

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
      (_, i) => i !== index,
    );

    setDetails({
      ...details,
      betbuilder_selection: updatedSelections,
    });
  };

  const clearError = () => {
    setError({
      ...error,
      selection: "",
    });
  };

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
        width={isTablet ? "60%" : "100%"}
        onClick={addSelection}
        onChange={handleSelectionInput}
        value={newSelection}
        disabled={disabled}
        onFocus={clearError}
        errorStyle={!!error?.selection}
      />
      {error?.selection && hasInputError(error.selection)}
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
