import "./DateInput.css";

import { BetInputProps } from "../../../../utils/types";
import { TextInput } from "../../../index";

interface DateInputProps extends BetInputProps {
  gridRow?: string;
  gridColumn?: string;
}

export const DateInput = ({
  handleBetInput,
  details,
  disabled,
  gridRow,
  gridColumn,
}: DateInputProps) => (
  <div
    className="date-input"
    style={{ gridRow: gridRow, gridColumn: gridColumn }}
  >
    <TextInput
      className="text-input"
      label="Date"
      type="date"
      id="date"
      name="date"
      onChange={handleBetInput}
      value={details.date}
      disabled={disabled}
    />
  </div>
);
