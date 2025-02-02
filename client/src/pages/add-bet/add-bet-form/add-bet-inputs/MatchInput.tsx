import "./MatchInput.css";

import { TextInput } from "../../../../components/common/inputs/TextInput";
import { hasInputError } from "../../../../utils/inputValidators";
import { BetInputProps } from "../../../../utils/types";

interface MatchInputProps extends BetInputProps {
  gridRow?: string;
  gridColumn?: string;
  error?: { [key: string]: string };
  // setError: Dispatch<
  //   SetStateAction<{
  //     [key: string]: string;
  //   }>
  // >;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const MatchInput = ({
  handleBetInput,
  details,
  disabled,
  gridColumn,
  gridRow,
  error,
  handleBlur,
  handleFocus,
}: MatchInputProps) => {
  return (
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
          errorStyle={!!error?.match}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
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
          errorStyle={!!error?.match}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
        />
      </div>
      {(error?.match || error?.home_team || error?.away_team) &&
        hasInputError(error.match || error.home_team || error?.away_team)}
    </div>
  );
};
