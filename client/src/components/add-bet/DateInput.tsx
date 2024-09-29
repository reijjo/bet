import { InputProps } from "../../utils/types";
import { TextInput } from "../index";

export const DateInput = ({
  handleTextInput,
  newBet,
  myBet,
  modifyIndex,
  addParlay,
}: InputProps) => (
  <div className="date-input">
    <TextInput
      className="text-input"
      label="Date"
      type="date"
      id="date"
      name="date"
      size={20}
      value={newBet.betDetails.date}
      disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
      onChange={handleTextInput}
    />
  </div>
);
