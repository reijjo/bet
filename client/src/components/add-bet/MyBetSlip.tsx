import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { Bet } from "../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../index";

type MyBetsProps = {
  myBet: Bet[];
  setMyBet: Dispatch<React.SetStateAction<Bet[]>>;
  handleModifyBet: (index: number) => void;
  handleAddToParley: () => void;
};

export const MyBetSlip = ({
  myBet,
  setMyBet,
  handleModifyBet,
  handleAddToParley,
}: MyBetsProps) => {
  const [potentialWin, setPotentialWin] = useState<string>("0.00");
  const [addStake, setAddStake] = useState(false);

  useEffect(() => {
    const potentialWin = () => {
      const allOdds = myBet
        .reduce((acc, bet) => acc * Number(bet.odds), 1)
        .toFixed(2);

      if (myBet.length > 0) {
        setPotentialWin((Number(allOdds) * myBet[0].stake).toFixed(2));
      } else {
        setPotentialWin("0.00");
      }
    };
    potentialWin();
  }, [myBet]);

  const handleStakeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStake = parseFloat(e.target.value) || 0;

    setMyBet((prevBets) => {
      const updatedBets = [...prevBets];
      if (updatedBets.length > 0) {
        updatedBets[0].stake = newStake;
      }
      return updatedBets;
    });
  };

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
          <div className="mybet-league">sport / league</div>
          <div className="mybet-odds">odds</div>
          <div className="mybet-more" style={{ visibility: "hidden" }}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </div>
        {myBet.map((bet, index) => (
          <div key={index} className="finish-mybet-slip">
            <div className="mybet-slip-match">
              <p className="mybet-slip-hometeam">{bet.home_team}</p>
              <p className="mybet-slip-awayteam">{bet.away_team}</p>
            </div>
            <div className="mybet-slip-selection">
              <p className="bet-selection">{bet.selection}</p>
            </div>
            <div className="mybet-slip-league">{bet.sport}</div>
            <div className="mybet-slip-odds">{bet.odds}</div>
            <div className="mybet-slip-more">
              <a className="mybet-edit" onClick={() => handleModifyBet(index)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </a>
            </div>
          </div>
        ))}
      </div>
      {!addStake ? (
        <div className="finish-bet-buttons">
          <Button
            type="button"
            onClick={() => setAddStake(true)}
            className="btn big-btn-style"
            children="Add Stake"
          />
          <Button
            type="button"
            onClick={handleAddToParley}
            className="btn outline-btn"
            children="Add to parley"
          />
        </div>
      ) : (
        <div className="finish-the-bet">
          <div className="add-stake-input">
            <input
              type="text"
              size={10}
              placeholder="Stake"
              value={myBet.length > 0 ? myBet[0].stake : ""}
              onChange={handleStakeChange}
            />
            <div className="mybet-slip-potential">
              <p>Potential Win:</p>
              <p>{potentialWin} &euro;</p>
            </div>
          </div>
          <div className="finish-bet-buttons">
            <Button
              type="button"
              // onClick={() => setAddStake(true)}
              className="btn big-btn-style"
              children="Add Bet"
            />
            <Button
              type="button"
              onClick={() => {
                setAddStake(false);
                setMyBet(myBet.map((bet) => ({ ...bet, stake: 0 })));
              }}
              className="btn outline-btn"
              children="Cancel"
            />
          </div>
        </div>
      )}
    </div>
  );
};
