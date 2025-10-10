import "./AddStakeForm.css";

import { Dispatch, SetStateAction } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { initialBetValues } from "../../../utils/defaults/defaults";
import { Bet } from "../../../utils/types";
import { FinishBetForm } from "../finish-bet-form/FinishBetForm";
import { BetToStake } from "./BetToStake";

type MyBetsProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  handleModifyBet: (index: number) => void;
  modifyId: number | null;
  setModifyId: Dispatch<SetStateAction<number | null>>;
};

export const AddStakeForm = ({
  myBet,
  setMyBet,
  modifyId,
  setModifyId,
  handleModifyBet,
}: MyBetsProps) => {
  const cancelBet = () => {
    setModifyId(null);
    setMyBet(initialBetValues);
  };

  console.log("MY BET", myBet);

  const visibleClass =
    modifyId === null && myBet.betDetails.length > 0 ? "visible" : "";

  return (
    <div
      className={`addstake-container ${visibleClass}`}
      id="finish-my-bet"
      data-testid="add-stake"
    >
      <div className="mybet-header">
        <h3 className="container-header">Add Stake</h3>
        <button
          className="mybets-close"
          disabled={modifyId !== null}
          data-testid="mybets-close"
        >
          <a onClick={cancelBet} title="Close">
            <FontAwesomeIcon icon={faXmark} />
          </a>
        </button>
      </div>
      <div className="mybet-add-stake">
        <BetToStake myBet={myBet} handleModifyBet={handleModifyBet} />
        <FinishBetForm
          myBet={myBet}
          setMyBet={setMyBet}
          modifyId={modifyId}
          setModifyId={setModifyId}
        />
      </div>
    </div>
  );
};
