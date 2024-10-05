import { BetInputProps } from "../../../utils/types";
import { TextInput } from "../../index";

export const DateInput = ({
  handleBetInput,
  details,
  disabled,
}: BetInputProps) => (
  <div className="date-input">
    <TextInput
      className="text-input"
      label="Date"
      type="date"
      id="date"
      name="date"
      size={20}
      onChange={handleBetInput}
      value={details.date}
      disabled={disabled}
    />
  </div>
);
