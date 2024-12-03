import "./OddsInput.css";

import { BetInputProps } from "../../../utils/types";
import { TextInput } from "../../index";

export const OddsInput = ({
  handleBetInput,
  details,
  disabled,
}: BetInputProps) => (
  <div className="odds-input">
    <TextInput
      className="text-input"
      label="Odds"
      optional="decimal"
      type="text"
      placeholder="1.91"
      id="odds"
      name="odds"
      onChange={handleBetInput}
      value={details.odds}
      disabled={disabled}
    />
  </div>
);
