import { BetInputProps } from "../../../utils/types";
import { TextArea } from "../../index";

export const NotesInput = ({
  handleBetInput,
  details,
  disabled,
}: BetInputProps) => (
  <div className="notes-input">
    <TextArea
      className="text-input"
      label="Notes"
      optional="optional"
      id="notes"
      name="notes"
      rows={2}
      cols={1}
      placeholder="Your own notes about the bet..."
      value={details.notes}
      disabled={disabled}
      onChange={handleBetInput}
    />
  </div>
);
