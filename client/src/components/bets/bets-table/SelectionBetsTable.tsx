import "./SelectionBetsTable.css";

import { Fragment } from "react/jsx-runtime";

import { BetType } from "../../../utils/enums";
import { Bet } from "../../../utils/types";

interface SelectionBetsTableProps {
  bet: Bet;
}

export const SelectionBetsTable = ({ bet }: SelectionBetsTableProps) => {
  const parseBetBuilderSelection = (selection: string) => {
    return selection
      .split(",")
      .map((item, index) => <p key={index}>{item.trim()}</p>);
  };

  return (
    <td className="table-selection">
      <div className="table-selection-wrapper">
        {bet.betDetails.map((parlay, index) => (
          <Fragment key={`${bet.id}-${index}`}>
            <div className="table-selection-teams">
              <p title={parlay.home_team}>{parlay.home_team}</p>
              <p>-</p>
              <p title={parlay.away_team}>{parlay.away_team}</p>
            </div>
            <div className="table-selection-selection">
              {bet.bet_final_type === BetType.BetBuilder ? (
                <div className="betbuilder-selections">
                  {parseBetBuilderSelection(parlay.selection)}
                </div>
              ) : (
                <p title={parlay.selection}>{parlay.selection}</p>
              )}
            </div>
          </Fragment>
        ))}
      </div>
    </td>
  );
};
