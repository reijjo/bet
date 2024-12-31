import "./MatchInput.css";

import { BetInputProps } from "../../../../utils/types";
import { TextInput } from "../../../common/inputs/TextInput";

interface MatchInputProps extends BetInputProps {
  gridRow?: string;
  gridColumn?: string;
}

export const MatchInput = ({
  handleBetInput,
  details,
  disabled,
  gridColumn,
  gridRow,
}: MatchInputProps) => (
  <div
    className="match-input"
    style={{ gridColumn: gridColumn, gridRow: gridRow }}
  >
    <div className="match-input-label">
      <p>Match</p>
      <p className="text-input-paragraph">(optional)</p>
    </div>
    <div className="match-input-fields">
      <TextInput
        label="Match"
        showLabel={false}
        optional="optional"
        type="text"
        placeholder="Home Team"
        id="home_team"
        name="home_team"
        onChange={handleBetInput}
        value={details.home_team}
        disabled={disabled}
        width="100%"
      />
      <p className="match-dash">-</p>
      <TextInput
        label="Away Team"
        showLabel={false}
        type="text"
        placeholder="Away Team"
        id="away_team"
        name="away_team"
        onChange={handleBetInput}
        value={details.away_team}
        disabled={disabled}
      />
    </div>
  </div>
);
