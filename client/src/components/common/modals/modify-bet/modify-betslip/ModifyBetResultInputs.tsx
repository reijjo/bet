import "./ModifyBet.css";

import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { isBetBuilderType } from "../../../../../pages/add-bet/betUtils";
import { BetType } from "../../../../../utils/enums";
import { Bet } from "../../../../../utils/types";

type Result = {
  [key: number]: {
    home_result: string;
    away_result: string;
    betbuilder_result: string[];
  };
};

type ModifyBetResultInputsProps = {
  bet: {
    bet_type: BetType;
    betbuilder_selection?: string[];
  };
  result: Result;
  betIndex: number;
  setResult: Dispatch<SetStateAction<Result>>;
  myBet: Bet;
};

export const ModifyBetResultInputs = ({
  bet,
  result,
  betIndex,
  setResult,
  myBet,
}: ModifyBetResultInputsProps) => {
  const handleResultChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = event.target;
    setResult((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [name]: value,
      },
    }));
  };

  const handleBetbuilderResultChange = (
    event: ChangeEvent<HTMLInputElement>,
    betIndex: number,
    selectionIndex: number,
  ) => {
    const { value } = event.target;
    setResult((prev) => {
      const totalSelections =
        myBet.betDetails[betIndex].betbuilder_selection?.length || 0;
      const currentResults =
        prev[betIndex]?.betbuilder_result || Array(totalSelections).fill("");
      const newResults = [...currentResults];
      newResults[selectionIndex] = value;

      return {
        ...prev,
        [betIndex]: {
          ...prev[betIndex],
          betbuilder_result: newResults,
        },
      };
    });
  };

  return (
    <div className="modifybet-result-inputs">
      {isBetBuilderType(bet.bet_type) ? (
        <div className="modifybet-result-fields-betbuilder">
          {bet.betbuilder_selection?.map((_selection, selectionIndex) => (
            <div key={selectionIndex}>
              <input
                key={selectionIndex}
                name={`betbuilder_result_${selectionIndex}`}
                value={
                  result[betIndex]?.betbuilder_result[selectionIndex] ?? ""
                }
                onChange={(e) =>
                  handleBetbuilderResultChange(e, betIndex, selectionIndex)
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="modifybet-result-fields">
          <input
            name="home_result"
            value={result[betIndex]?.home_result || ""}
            onChange={(e) => handleResultChange(e, betIndex)}
          />
          <input
            name="away_result"
            value={result[betIndex]?.away_result || ""}
            onChange={(e) => handleResultChange(e, betIndex)}
          />
        </div>
      )}
    </div>
  );
};
