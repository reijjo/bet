import "./ModifyBetSlip.css";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Bet } from "../../../../utils/types";
import { FinishModify } from "./FinishModify";
import {
  ModifyBetHeaders,
  ModifyBetMatch,
  ModifyBetMore,
  ModifyBetOdds,
  ModifyBetResultInputs,
  ModifyBetSelection,
} from "./modify-betslip";

type MyBetsProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  handleModifyBet: (index: number) => void;
};

export type Result = {
  [key: number]: {
    home_result: string;
    away_result: string;
    betbuilder_result: string[];
  };
};

export const ModifyBetSlip = ({
  myBet,
  setMyBet,
  handleModifyBet,
}: MyBetsProps) => {
  const [result, setResult] = useState<Result>({});

  // TODO: ON MOBILE show selection and make a result to open on click
  // POPOVER html css

  // Makes enough result objects for each bet
  useEffect(() => {
    const initialResult: Result = {};
    myBet.betDetails.forEach((bet, index) => {
      initialResult[index] = {
        home_result: bet.home_result || "",
        away_result: bet.away_result || "",
        betbuilder_result:
          bet.betbuilder_result ||
          (bet.betbuilder_selection && bet.betbuilder_selection.length > 0
            ? Array(bet.betbuilder_selection.length).fill("")
            : []),
      };
    });
    setResult(initialResult);
  }, [myBet]);

  // Return
  return (
    <div className="modifybet-container">
      <div className="modifybet-add-stake">
        <ModifyBetHeaders />
        {myBet.betDetails.map((bet, betIndex) => (
          <div key={betIndex} className="finish-modifybet-slip">
            <ModifyBetMatch bet={bet} />
            <ModifyBetResultInputs
              bet={bet}
              result={result}
              betIndex={betIndex}
              setResult={setResult}
              myBet={myBet}
            />
            <ModifyBetSelection details={bet} betIndex={betIndex} />
            <ModifyBetOdds details={bet} />
            <ModifyBetMore
              handleModifyBet={handleModifyBet}
              betIndex={betIndex}
            />
          </div>
        ))}
        <FinishModify myBet={myBet} setMyBet={setMyBet} result={result} />
      </div>
    </div>
  );
};
