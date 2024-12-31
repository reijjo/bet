import "./ModifyBet.css";

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ModifyBetMoreProps = {
  handleModifyBet: (index: number) => void;
  betIndex: number;
};

export const ModifyBetMore = ({
  handleModifyBet,
  betIndex,
}: ModifyBetMoreProps) => {
  return (
    <div className="modifybet-slip-more">
      <a className="modifybet-edit" onClick={() => handleModifyBet(betIndex)}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </a>
    </div>
  );
};
