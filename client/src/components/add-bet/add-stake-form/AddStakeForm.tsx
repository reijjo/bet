import "./AddStakeForm.css";

import { Dispatch, SetStateAction } from "react";

import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Bet } from "../../../utils/types";
import { FinishBetForm } from "../../index";
import { initialBetValues, isBetBuilderType } from "../betUtils";
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
    <div className="addbet-container" id="finish-my-bet">
      <div className="mybet-header">
        <h3 className="container-header">Add Stake</h3>
        <button className="mybets-close" disabled={modifyIndex !== null}>
          <a onClick={cancelBet} title="Close">
            <FontAwesomeIcon icon={faXmark} />
          </a>
        </button>
      </div>
      <div className="mybet-add-stake">
        {/* <BetToStake myBet={myBet} /> */}
        <BetToStake />
        {myBet.betDetails
          .filter((bet) => bet.odds !== "")
          .map((bet, index) => (
            <div key={index} className="finish-mybet-slip">
              <div className="mybet-slip-match">
                <p className="mybet-slip-hometeam">{bet.home_team}</p>
                <p className="mybet-slip-awayteam">{bet.away_team}</p>
              </div>
              <div className="mybet-slip-selection">
                {!isBetBuilderType(bet.bet_type) ? (
                  <p>{bet.selection}</p>
                ) : (
                  <>
                    {bet.betbuilder_selection?.map((selection, index) => (
                      <p key={index}>{selection}</p>
                    ))}
                  </>
                )}
              </div>
              <div className="mybet-slip-odds">
                {Number(bet.odds).toFixed(2)}
              </div>
              <div className="mybet-slip-more">
                <a
                  className="mybet-edit"
                  onClick={() => handleModifyBet(index)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </a>
              </div>
            </div>
          ))}
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
