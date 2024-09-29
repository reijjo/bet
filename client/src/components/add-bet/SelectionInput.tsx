import { InputProps } from "../../utils/types";
import { TextInput } from "../index";

export const SelectionInput = ({
  handleTextInput,
  newBet,
  myBet,
  modifyIndex,
  addParlay,
}: InputProps) => (
  <div className="selection-input">
    <TextInput
      className="text-input"
      label="Selection"
      type="text"
      placeholder="Selection"
      id="selection"
      name="selection"
      size={15}
      onChange={handleTextInput}
      value={newBet.betDetails.selection}
      disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
    />
  </div>
);
