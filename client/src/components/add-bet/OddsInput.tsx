import { InputProps } from "../../utils/types";
import { TextInput } from "../index";

export const OddsInput = ({
  handleTextInput,
  newBet,
  myBet,
  modifyIndex,
  addParlay,
}: InputProps) => (
  <div className="odds-input">
    <TextInput
      className="text-input"
      label="Odds"
      optional="decimal"
      type="text"
      placeholder="Odds"
      id="odds"
      name="odds"
      size={15}
      onChange={handleTextInput}
      value={newBet.betDetails.odds}
      disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
    />
  </div>
);
