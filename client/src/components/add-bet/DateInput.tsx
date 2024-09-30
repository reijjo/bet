import { BetInputProps } from "../../utils/types";
import { TextInput } from "../index";

export const DateInput = ({
  handleBetInput,
  myBet,
}: // modifyIndex,
// addParlay,
BetInputProps) => (
  <div className="date-input">
    <TextInput
      className="text-input"
      label="Date"
      type="date"
      id="date"
      name="date"
      size={20}
      onChange={handleBetInput}
      value={myBet.betDetails[0].date}
      // disabled={myBet && myBet.length > 0 && modifyIndex === null && !addParlay}
    />
  </div>
);
