import "./ResultBetsTable.css";

import { Fragment } from "react/jsx-runtime";

import { BetType } from "../../../utils/enums";
import { Bet, BetDetails } from "../../../utils/types";

interface ResultBetsTableProps {
  bet: Bet;
}

export const ResultBetsTable = ({ bet }: ResultBetsTableProps) => {
  const getBetResult = (bet: Bet, parlay: BetDetails): string => {
    let result = "";

    if (bet.bet_final_type === BetType.BetBuilder) {
      result = parlay.betbuilder_result || "";
    } else {
      result = `${parlay.home_result || ""} - ${parlay.away_result || ""}`;
    }

    return result;
  };

  const parseBetBuilderSelection = (result: string) => {
    return result
      .split(",")
      .map((item, index) => <p key={index}>{item.trim()}</p>);
  };

  console.log("bet", bet);
  console.log("result", getBetResult(bet, bet.betDetails[0]));
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
              {bet.bet_final_type === BetType.BetBuilder ? (
                <div className="betbuilder-selections">
                  {parseBetBuilderSelection(parlay.betbuilder_result || "-")}
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
