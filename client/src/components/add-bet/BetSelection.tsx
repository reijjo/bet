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
    console.log("clear field", details.selection);
    setDetails({
      ...details,
      selection: "",
    });
  };

  const removeBuilderSelection = () => {
    console.log("JEEE", details.betbuilder_selection);
  };

  console.log("EKA", details.betbuilder_selection);
  console.log(
    "toka",
    details.betbuilder_selection?.map((i) => i),
  );

  return (
    <div className="bet-selection-component">
      {details?.betbuilder_selection ? (
        <>
          <div>
            {details.betbuilder_selection.map((selection, index) => (
              <p key={index}>{selection}</p>
            ))}
          </div>
          <button onClick={removeBuilderSelection} type="button">
            <FontAwesomeIcon icon={faXmark} size="xs" />
          </button>
        </>
      ) : (
        <>
          <p>{details.selection}</p>
          <button onClick={clearField} type="button">
            <FontAwesomeIcon icon={faXmark} size="xs" />
          </button>
        </>
      )}
    </div>
  );
};
