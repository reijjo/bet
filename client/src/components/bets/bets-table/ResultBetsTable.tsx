import "./ResultBetsTable.css";

import { Fragment } from "react/jsx-runtime";

import { BetType } from "../../../utils/enums";
import { Bet } from "../../../utils/types";

interface ResultBetsTableProps {
  bet: Bet;
}

export const ResultBetsTable = ({ bet }: ResultBetsTableProps) => {
  // console.log("bet", bet);
  const renderBetBuildSelection = (result?: string[]) => {
    if (!Array.isArray(result) || result.length === 0) {
      return <p>-</p>;
    }

    return result.map((item, index) => (
      <p key={index} title={item}>
        {item.trim()}
      </p>
    ));
  };

  return (
    <td className="table-result">
      <div className="table-result-wrapper">
        {bet.betDetails.map((parlay, index) => (
          <Fragment key={`${bet.id}-${index}`}>
            <div className="table-result-teams visibility-hidden">
              <p title={parlay.home_team}>{parlay.home_team}</p>
              <p>-</p>
              <p title={parlay.away_team}>{parlay.away_team}</p>
            </div>
            <div className="table-result-selection">
              {parlay.bet_type === BetType.BetBuilder ||
              parlay.bet_type === BetType.Tuplaus ? (
                <div className="betbuilder-selections">
                  {renderBetBuildSelection(parlay.betbuilder_result)}
                </div>
              ) : (
                <div
                  className={`${parlay.home_result ? "table-result-results" : "no-gap"}`}
                >
                  <p title={parlay.home_result}>{parlay.home_result}</p>
                  <p>-</p>
                  <p title={parlay.away_result}>{parlay.away_result}</p>
                </div>
              )}
            </div>
          </Fragment>
        ))}
      </div>
    </td>
  );
};
