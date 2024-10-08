import { BetInputProps } from "../../../utils/types";
import { TextInput } from "../../index";

export const SelectionInput = ({
  handleBetInput,
  details,
  disabled,
}: BetInputProps) => (
  <div className="selection-input">
    <TextInput
      className="text-input"
      label="Selection"
      type="text"
      placeholder="Selection"
      id="selection"
      name="selection"
      size={15}
      onChange={handleBetInput}
      value={details.selection}
      disabled={disabled}
    />
  </div>
);
