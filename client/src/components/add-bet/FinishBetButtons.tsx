import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "../common/Button";
import { Bet } from "../../utils/types";
import { initialBetDetailValues } from "./betUtils";

type FinishBetButtonsProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  addStake: boolean;
  setAddStake: Dispatch<SetStateAction<boolean>>;
  modifyIndex: number | null;
  setModifyIndex: Dispatch<React.SetStateAction<number | null>>;
};

export const FinishBetButtons = ({
  myBet,
  setMyBet,
  addStake,
  setAddStake,
  modifyIndex,
  setModifyIndex,
}: FinishBetButtonsProps) => {
  const [potentialWin, setPotentialWin] = useState<string>("0.00");

  useEffect(() => {
    const potentialWin = () => {
      const allOdds = myBet.betDetails
        .reduce((acc, bet) => acc * Number(bet.odds), 1)
        .toFixed(2);
      setPotentialWin((Number(allOdds) * Number(myBet.stake)).toFixed(2));
    };
    potentialWin();
  }, [myBet]);

  const handleStakeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMyBet((prev) => ({
      ...prev,
      stake: e.target.value,
    }));
  };

  const handleAddToParlay = () => {
    setMyBet((prev) => ({
      ...prev,
      betDetails: [...prev.betDetails, initialBetDetailValues],
    }));
    setModifyIndex(myBet.betDetails.length);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {!addStake ? (
        <div className="finish-bet-buttons">
          <div className="flex-container">
            <Button
              type="button"
              onClick={() => setAddStake(true)}
              className="btn big-btn-style"
              children="Add Stake"
              disabled={modifyIndex !== null}
            />
            <Button
              type="button"
              onClick={handleAddToParlay}
              className="btn outline-btn"
              children="Add to parley"
              disabled={modifyIndex !== null}
            />
          </div>
        </div>
      ) : (
        <div className="finish-the-bet">
          <div className="add-stake-input">
            <div className="flex-container">
              <input
                type="text"
                size={10}
                placeholder="Stake"
                value={myBet.stake || ""}
                onChange={handleStakeChange}
              />
              <div className="mybet-slip-potential">
                <p>Potential Win:</p>
                <p>
                  {potentialWin}
                  &euro;
                </p>
              </div>
            </div>
          </div>
          <div className="finish-bet-buttons">
            <div className="flex-container">
              <Button
                type="submit"
                className="btn big-btn-style"
                children="Add Bet"
              />
              <Button
                type="button"
                onClick={() => {
                  setAddStake(false);
                  setMyBet((bet) => ({ ...bet, stake: 0 }));
                }}
                className="btn outline-btn"
                children="Cancel"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
