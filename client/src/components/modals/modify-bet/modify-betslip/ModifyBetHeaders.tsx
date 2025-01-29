import "./ModifyBet.css";

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ModifyBetHeaders = () => (
  <div className="finish-modifybet-slip-headers">
    <div className="modifybet-match">match</div>
    <div className="modifybet-result">result</div>
    <div className="modifybet-selection">selection</div>
    <div className="modifybet-odds">odds</div>
    <div className="modifybet-more" style={{ visibility: "hidden" }}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </div>
  </div>
);
