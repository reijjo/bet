import "./LatestSelections.css";

import { Fragment } from "react/jsx-runtime";

import { BetDetails } from "../../../../utils/types";
import { isBetBuilderType } from "../../../add-bet/betUtils";

type LatestSelectionsProps = {
  details: BetDetails[];
};

export const LatestSelections = ({ details }: LatestSelectionsProps) => (
  <div className="latest-bet-details">
    {details.map((parlay, index) => (
      <Fragment key={index}>
        {isBetBuilderType(parlay.bet_type) ? (
          <div className="parlay-div">
            {parlay.betbuilder_selection?.map((s, index) => (
              <p key={index} title={s}>
                {s}
              </p>
            ))}
          </div>
        ) : (
          <p className="bet-selection" title={parlay.selection}>
            {parlay.selection}
          </p>
        )}
      </Fragment>
    ))}
  </div>
);
