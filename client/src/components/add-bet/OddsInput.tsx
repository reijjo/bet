import { BetInputProps } from "../../utils/types";
import { TextInput } from "../index";

export const OddsInput = ({
  handleBetInput,
  myBet,
}: // modifyIndex,
// addParlay,
BetInputProps) => (
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
      onChange={handleBetInput}
      value={myBet.betDetails[0].odds}
      // disabled={myBet && myBet.length > 0 && modifyIndex === null && !addParlay}
    />
  </div>
);
