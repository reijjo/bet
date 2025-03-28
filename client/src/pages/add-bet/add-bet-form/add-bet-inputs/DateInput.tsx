import "./DateInput.css";

import { TextInput } from "../../../../components/index";
import { useParsers } from "../../../../hooks/useParsers";
import { BetInputProps } from "../../../../utils/types";

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
}: DateInputProps) => {
  const { parseDate } = useParsers();

  return (
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
        value={parseDate(details.date)}
        disabled={disabled}
      />
    </div>
  );
};
