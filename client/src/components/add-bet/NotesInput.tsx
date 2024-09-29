import { InputProps } from "../../utils/types";
import { TextArea } from "../index";

export const NotesInput = ({
  handleTextInput,
  newBet,
  myBet,
  modifyIndex,
  addParlay,
}: InputProps) => (
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
      value={newBet.betDetails.notes}
      disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
      onChange={handleTextInput}
    />
  </div>
);
