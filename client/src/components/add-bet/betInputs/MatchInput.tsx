import "./MatchInput.css";

import { BetInputProps } from "../../../utils/types";
import { TextInput } from "../../index";

export const MatchInput = ({
  handleBetInput,
  details,
  // disabled,
}: // modifyIndex,
BetInputProps) => (
  <div className="match-input">
    <div className="match-input-label">
      <p>Match</p>
      <p className="text-input-paragraph">(optional)</p>
    </div>
    <div className="match-input-fields">
      <TextInput
        className="text-input"
        label="Home Team"
        showLabel={false}
        type="text"
        placeholder="Home Team"
        id="home_team"
        name="home_team"
        onChange={handleBetInput}
        value={details.home_team}
        // disabled={disabled}
        width="100%"
        disabled={false}
      />
      <p className="match-dash">-</p>
      <TextInput
        className="text-input"
        label="Away Team"
        showLabel={false}
        type="text"
        placeholder="Away Team"
        id="away_team"
        name="away_team"
        onChange={handleBetInput}
        value={details.away_team}
        // disabled={disabled}
        disabled={false}
      />
    </div>
  </div>
);
