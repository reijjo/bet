import { BetInputProps } from "../../utils/types";
import { TextInput } from "../index";

export const SelectionInput = ({
  handleBetInput,
  myBet,
}: // modifyIndex,
// addParlay,
BetInputProps) => (
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
      value={myBet.betDetails[0].selection}
      // disabled={myBet && myBet.length > 0 && modifyIndex === null && !addParlay}
    />
  </div>
);
