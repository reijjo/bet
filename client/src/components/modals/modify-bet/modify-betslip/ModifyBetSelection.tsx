import "./ModifyBet.css";

import { useState } from "react";

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useScreenWidth } from "../../../../hooks/useScreenWidth";
import { isBetBuilderType } from "@utils/betUtils";
import { BetDetails } from "../../../../utils/types";

type ModifyBetSelectionProps = {
  details: BetDetails;
  betIndex: number;
};

export const ModifyBetSelection = ({
  details,
  betIndex,
}: ModifyBetSelectionProps) => {
  // For mobile layout to show selection on hover
  const [hoveredSelection, setHoveredSelection] = useState<{
    betIndex: number;
    selectionIndex: number;
  } | null>(null);

  const { isMobile } = useScreenWidth();

  // console.log("hoveredSelection", hoveredSelection);

  return (
    <div className="modifybet-slip-selection" style={{ position: "static" }}>
      {isBetBuilderType(details.bet_type) ? (
        details.betbuilder_selection?.map((s, selectionIndex) => (
          <div
            key={selectionIndex}
            className="bet-selection"
            style={
              isMobile
                ? {
                    width: "100%",
                    textAlign: "center",
                    position: "static",
                  }
                : {}
            }
          >
            {isMobile ? (
              <div className="tooltip-container" style={{ position: "static" }}>
                <button
                  className="tooltip-trigger"
                  onMouseEnter={() =>
                    setHoveredSelection({ betIndex, selectionIndex })
                  }
                  onMouseLeave={() => setHoveredSelection(null)}
                  title={s}
                >
                  <FontAwesomeIcon icon={faCircleInfo} />
                </button>
                {hoveredSelection?.betIndex === betIndex &&
                  hoveredSelection?.selectionIndex === selectionIndex && (
                    <div className="tooltip-content">
                      <span className="tooltip-text">{s}</span>
                      <div className="tooltip-arrow"></div>
                    </div>
                  )}
              </div>
            ) : (
              s
            )}
          </div>
        ))
      ) : (
        <p className="bet-selection" title={details.selection}>
          {details.selection}
        </p>
      )}
    </div>
  );
};
