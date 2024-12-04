import "./BetSelection.css";

import { Dispatch } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BetDetails } from "../../utils/types";

interface BetSelectionProps {
  details: BetDetails;
  setDetails: Dispatch<React.SetStateAction<BetDetails>>;
}

export const BetSelection = ({ details, setDetails }: BetSelectionProps) => {
  const clearField = () => {
    setDetails({
      ...details,
      selection: "",
    });
  };

  const removeBuilderSelection = () => {
    console.log("JEEE", details.betbuilder_selection);
  };

  return (
    <>
      {details?.betbuilder_selection ? (
        <div className="betbuilder-selections-container">
          {details.betbuilder_selection.map((selection, index) => (
            <div key={index} className="bet-selection-component">
              <p title={selection}>{selection}</p>
              <button onClick={removeBuilderSelection} type="button">
                <FontAwesomeIcon icon={faXmark} size="xs" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bet-selection-component">
          <p>{details.selection}</p>
          <button onClick={clearField} type="button">
            <FontAwesomeIcon icon={faXmark} size="xs" />
          </button>
        </div>
      )}
    </>
  );
};
