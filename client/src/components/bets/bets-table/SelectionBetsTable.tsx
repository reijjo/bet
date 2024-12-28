import "./SelectionBetsTable.css";

import { Fragment } from "react/jsx-runtime";

import { Bet } from "../../../utils/types";
import { isBetBuilderType } from "../../add-bet/betUtils";

interface SelectionBetsTableProps {
  bet: Bet;
}

export const SelectionBetsTable = ({ bet }: SelectionBetsTableProps) => {
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
              {isBetBuilderType(parlay.bet_type) ? (
                <div className="betbuilder-selections">
                  {renderBetBuildSelection(parlay.betbuilder_selection)}
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
