import "./MyBetSlip.css";
import { Dispatch } from "react";
import { Bet } from "../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FinishBetForm } from "../index";
import { initialBetValues } from "./betUtils";

type MyBetsProps = {
  myBet: Bet;
  setMyBet: Dispatch<React.SetStateAction<Bet>>;
  handleModifyBet: (index: number) => void;
  setModifyIndex: Dispatch<React.SetStateAction<number | null>>;
  addParlay: boolean;
};

export const MyBetSlip = ({
  myBet,
  setMyBet,
  handleModifyBet,
}: MyBetsProps) => {
  const cancelBet = () => {
    setMyBet(initialBetValues);
  };

  return (
    <div className="addbet-container" id="finish-my-bet">
      <div className="mybet-header">
        <h3 className="container-header">Add Stake</h3>
        <div className="mybets-close">
          <a onClick={cancelBet} title="Close">
            <FontAwesomeIcon icon={faXmark} />
          </a>
        </div>
      </div>
      <div className="mybet-add-stake">
        <div className="finish-mybet-slip-headers">
          <div className="mybet-match">match</div>
          <div className="mybet-selection">selection</div>
          <div className="mybet-odds">odds</div>
          <div className="mybet-more" style={{ visibility: "hidden" }}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </div>
        {myBet.betDetails.map((bet, index) => (
          <div key={index} className="finish-mybet-slip">
            <div className="mybet-slip-match">
              <p className="mybet-slip-hometeam">{bet.home_team}</p>
              <p className="mybet-slip-awayteam">{bet.away_team}</p>
            </div>
            <div className="mybet-slip-selection">
              <p className="bet-selection">{bet.selection}</p>
            </div>
            <div className="mybet-slip-odds">{bet.odds}</div>
            <div className="mybet-slip-more">
              <a className="mybet-edit" onClick={() => handleModifyBet(index)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </a>
            </div>
          </div>
        ))}
        <FinishBetForm myBet={myBet} setMyBet={setMyBet} />
      </div>
    </div>
  );
};
