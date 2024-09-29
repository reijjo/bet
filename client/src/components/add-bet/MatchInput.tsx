import { TextInput } from "../index";
import { InputProps } from "../../utils/types";

export const MatchInput = ({
  handleTextInput,
  newBet,
  myBet,
  modifyIndex,
  addParlay,
}: InputProps) => (
  <div className="match-input">
    <div
      style={{
        paddingLeft: "4px",
        fontSize: "0.925em",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <p>Match</p>
      <p className="text-input-paragraph">(optional)</p>
    </div>
    <div className="match-input-fields">
      <TextInput
        type="text"
        placeholder="Home Team"
        id="home_team"
        name="home_team"
        size={15}
        onChange={handleTextInput}
        value={newBet.betDetails.home_team}
        disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
      />
      <p className="match-dash">-</p>
      <TextInput
        type="text"
        placeholder="Away Team"
        id="away_team"
        name="away_team"
        size={15}
        onChange={handleTextInput}
        value={newBet.betDetails.away_team}
        disabled={myBet.length > 0 && modifyIndex === null && !addParlay}
      />
    </div>
  </div>
);
