import "./LatestMatch.css";

import { BetDetails } from "../../../../utils/types";

type LatestMatchProps = {
  details: BetDetails[];
};

export const LatestMatch = ({ details }: LatestMatchProps) => (
  <div className="bets-match">
    <div className="parlay-div">
      {details.map((parlay, index) => (
        <p className="bet-home-team" key={index} title={parlay.home_team}>
          {parlay.home_team}
        </p>
      ))}
    </div>
    <div className="parlay-div">
      {details.map((_parlay, index) => (
        <p className="bet-vs" key={index}>
          -
        </p>
      ))}
    </div>
    <div className="parlay-div">
      {details.map((parlay, index) => (
        <p className="bet-away-team" key={index} title={parlay.away_team}>
          {parlay.away_team}
        </p>
      ))}
    </div>
  </div>
);
