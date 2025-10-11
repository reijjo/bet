import "./FinishBetButtons.css";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { TextInput } from "@components/ui/inputs/TextInput";
import { Button2 } from "@/components";
import { useBetCalculations } from "@hooks/useBetCalculations";
import { initialBetDetailValues } from "@utils/defaults/defaults";
import { scrollToTop } from "@utils/helperFunctions";
import { Bet } from "@utils/types";

type FinishBetButtonsProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  addStake: boolean;
  setAddStake: Dispatch<SetStateAction<boolean>>;
  modifyId: number | null;
  setModifyId: Dispatch<React.SetStateAction<number | null>>;
  isLoading?: boolean;
};

export const FinishBetButtons = ({
  myBet,
  setMyBet,
  addStake = true,
  setAddStake,
  modifyId,
  setModifyId,
  isLoading,
}: FinishBetButtonsProps) => {
  const [potentialWin, setPotentialWin] = useState<string>("0.00");
  const { finalOdds } = useBetCalculations();

  useEffect(() => {
    const potentialWin = () => {
      setPotentialWin(
        (finalOdds(myBet.betDetails) * Number(myBet.stake)).toFixed(2)
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
    const newBetDetail = {
      ...initialBetDetailValues,
      id: Date.now(),
    };

    setMyBet((prev) => ({
      ...prev,
      betDetails: [...prev.betDetails, newBetDetail],
    }));
    setModifyId(newBetDetail.id);
    scrollToTop();
  };

  return (
    <>
      {!addStake ? (
        <div className="finish-bet-buttons">
          <Button2
            type="button"
            onClick={() => setAddStake(true)}
            className="btn2-cta"
            disabled={modifyId !== null}
          >
            Add Stake
          </Button2>
          <Button2
            type="button"
            onClick={handleAddToParlay}
            className="btn2-outline"
            disabled={modifyId !== null}
          >
            Add to parlay
          </Button2>
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
              <p>x {finalOdds(myBet.betDetails).toFixed(2)}</p>
              <p>Potential Win:</p>
              <p>
                <b>{potentialWin} &euro;</b>
              </p>
            </div>
          </div>
          <div className="submit-bet-buttons">
            <Button2 type="submit" className="btn2-cta">
              {isLoading ? "Adding..." : "Add Bet"}
            </Button2>
            <Button2
              type="button"
              onClick={() => {
                setAddStake(false);
                setMyBet((bet) => ({ ...bet, stake: 0 }));
              }}
              className="btn2-outline"
            >
              Cancel
            </Button2>
          </div>
        </>
      )}
    </>
  );
};
