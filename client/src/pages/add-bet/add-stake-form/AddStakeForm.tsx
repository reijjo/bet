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
  modifyIndex: number | null;
  setModifyIndex: Dispatch<SetStateAction<number | null>>;
};

export const AddStakeForm = ({
  myBet,
  setMyBet,
  modifyIndex,
  setModifyIndex,
  handleModifyBet,
}: MyBetsProps) => {
  const cancelBet = () => {
    setModifyIndex(null);
    setMyBet(initialBetValues);
  };

  return (
    <div
      className="addbet-container"
      id="finish-my-bet"
      data-testid="add-stake"
    >
      <div className="mybet-header">
        <h3 className="container-header">Add Stake</h3>
        <button
          className="mybets-close"
          disabled={modifyIndex !== null}
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
          modifyIndex={modifyIndex}
          setModifyIndex={setModifyIndex}
        />
      </div>
    </div>
  );
};
