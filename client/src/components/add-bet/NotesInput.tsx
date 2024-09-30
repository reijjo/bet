import { BetInputProps } from "../../utils/types";
import { TextArea } from "../index";

export const NotesInput = ({
  handleBetInput,
  myBet,
}: // modifyIndex,
// addParlay,
BetInputProps) => (
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
      value={myBet.betDetails[0].notes}
      // disabled={myBet && myBet.length > 0 && modifyIndex === null && !addParlay}
      onChange={handleBetInput}
    />
  </div>
);
