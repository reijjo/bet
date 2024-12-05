import "./BetSelection.css";

import { Dispatch } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BetType } from "../../utils/enums";
import { BetDetails } from "../../utils/types";

interface BetSelectionProps {
  details: BetDetails;
  setDetails: Dispatch<React.SetStateAction<BetDetails>>;
  removeSelection?: (index: number) => void;
}

export const BetSelection = ({
  details,
  setDetails,
  removeSelection,
}: BetSelectionProps) => {
  const clearField = () => {
    setDetails({
      ...details,
      selection: "",
    });
  };

  console.log("selection", details.selection);

  return (
    <>
      {details?.betbuilder_selection &&
      details.bet_type === BetType.BetBuilder ? (
        <div className="betbuilder-selections-container">
          {details.betbuilder_selection.map((selection, index) => (
            <div key={index} className="bet-selection-component">
              <p title={selection}>{selection}</p>
              <button
                onClick={() => removeSelection && removeSelection(index)}
                type="button"
              >
                <FontAwesomeIcon icon={faXmark} size="xs" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bet-selection-component">
          <p title={details.selection}>{details.selection}</p>
          <button onClick={clearField} type="button">
            <FontAwesomeIcon icon={faXmark} size="xs" />
          </button>
        </div>
      )}
    </>
  );
};
