import "./FinishBetButtons.css";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { Button, TextInput } from "../../components/";
import { useBetCalculations } from "../../hooks/useBetCalculations";
import { initialBetDetailValues } from "../../utils/defaults/defaults";
import { scrollToTop } from "../../utils/helperFunctions";
import { Bet } from "../../utils/types";

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
  addStake = true,
  setAddStake,
  modifyIndex,
  setModifyIndex,
}: FinishBetButtonsProps) => {
  const [potentialWin, setPotentialWin] = useState<string>("0.00");
  // const allOdds = myBet.betDetails
  //   .reduce((acc, bet) => acc * Number(bet.odds), 1)
  //   .toFixed(2);
  const { finalOdds } = useBetCalculations();

  useEffect(() => {
    const potentialWin = () => {
      setPotentialWin(
        (finalOdds(myBet.betDetails) * Number(myBet.stake)).toFixed(2),
      );
    };
    potentialWin();
  }, [myBet, finalOdds]);

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
    scrollToTop();
  };

  return (
    <>
      {!addStake ? (
        <div className="finish-bet-buttons">
          <Button
            type="button"
            onClick={() => setAddStake(true)}
            className="btn btn-filled"
            children="Add Stake"
            disabled={modifyIndex !== null}
          />
          <Button
            type="button"
            onClick={handleAddToParlay}
            className="btn btn-outline"
            children="Add bet to parley"
            disabled={modifyIndex !== null}
          />
        </div>
      ) : (
        <>
          <div className="add-stake-input">
            <TextInput
              className="text-input"
              label="Stake"
              type="text"
              placeholder="10"
              name="stake"
              id="stake"
              size={6}
              value={myBet.stake || ""}
              onChange={handleStakeChange}
            />
            <div className="mybet-slip-potential">
              <p>x {finalOdds(myBet.betDetails)}</p>
              <p>Potential Win:</p>
              <p>
                <b>{potentialWin} &euro;</b>
              </p>
            </div>
          </div>
          <div className="submit-bet-buttons">
            <Button
              type="submit"
              className="btn btn-filled"
              children="Add Bet"
            />
            <Button
              type="button"
              onClick={() => {
                setAddStake(false);
                setMyBet((bet) => ({ ...bet, stake: 0 }));
              }}
              className="btn btn-outline"
              children="Cancel"
            />
          </div>
        </>
      )}
    </>
  );
};
