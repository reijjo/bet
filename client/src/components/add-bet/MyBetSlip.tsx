import "./MyBetSlip.css";
import { Dispatch } from "react";
import { Bet } from "../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FinishBetForm } from "../index";

type MyBetsProps = {
  myBet: Bet[];
  setMyBet: Dispatch<React.SetStateAction<Bet[]>>;
  handleModifyBet: (index: number) => void;
  handleAddToParley: () => void;
  modifyIndex: number | null;
  addParlay: boolean;
  newBet: Bet;
  setNewBet: Dispatch<React.SetStateAction<Bet>>;
};

export const MyBetSlip = ({
  myBet,
  setMyBet,
  handleModifyBet,
  handleAddToParley,
  addParlay,
  newBet,
  setNewBet,
}: MyBetsProps) => {
  return (
    <div className="addbet-container" id="finish-my-bet">
      <div className="mybet-header">
        <h3 className="container-header">Add Stake</h3>
        <div className="mybets-close">
          <a onClick={() => setMyBet([])} title="Close">
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
        {myBet.map((bet, index) => (
          <div key={index} className="finish-mybet-slip">
            <div className="mybet-slip-match">
              <p className="mybet-slip-hometeam">{bet.betDetails.home_team}</p>
              <p className="mybet-slip-awayteam">{bet.betDetails.away_team}</p>
            </div>
            <div className="mybet-slip-selection">
              <p className="bet-selection">{bet.betDetails.selection}</p>
            </div>
            <div className="mybet-slip-odds">{bet.betDetails.odds}</div>
            <div className="mybet-slip-more">
              <a className="mybet-edit" onClick={() => handleModifyBet(index)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </a>
            </div>
          </div>
        ))}
        <FinishBetForm
          newBet={newBet}
          setNewBet={setNewBet}
          myBet={myBet}
          setMyBet={setMyBet}
          handleAddToParlay={handleAddToParley}
          addParlay={addParlay}
        />
      </div>
    </div>
  );
};
