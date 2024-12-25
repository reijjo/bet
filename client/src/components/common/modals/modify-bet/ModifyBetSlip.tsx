import "./ModifyBetSlip.css";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { faCircleInfo, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useScreenWidth } from "../../../../hooks/useScreenWidth";
import { BetType } from "../../../../utils/enums";
import { Bet } from "../../../../utils/types";
import { FinishModify } from "./FinishModify";

type MyBetsProps = {
  myBet: Bet;
  setMyBet: Dispatch<SetStateAction<Bet>>;
  handleModifyBet: (index: number) => void;
  modifyIndex: number | null;
  setModifyIndex: Dispatch<SetStateAction<number | null>>;
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
  modifyIndex,
  setModifyIndex,
}: MyBetsProps) => {
  const [result, setResult] = useState<Result>({});
  const [hoveredSelection, setHoveredSelection] = useState<{
    betIndex: number;
    selectionIndex: number;
  } | null>(null);
  const { isMobile } = useScreenWidth();

  // TODO: ON MOBILE show selection and make a result to open on click

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

  console.log("hoveredSelection", hoveredSelection);
  // Return
  return (
    <div className="modifybet-container">
      <div className="modifybet-add-stake">
        <div className="finish-modifybet-slip-headers">
          <div className="modifybet-match">match</div>
          <div className="modifybet-result">result</div>
          <div className="modifybet-selection">selection</div>
          <div className="modifybet-odds">odds</div>
          <div className="modifybet-more" style={{ visibility: "hidden" }}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </div>
        {myBet.betDetails.map((bet, betIndex) => (
          <div key={betIndex} className="finish-modifybet-slip">
            <div className="modifybet-slip-match">
              <p className="modifybet-slip-hometeam">{bet.home_team}</p>
              <p className="modifybet-slip-awayteam">{bet.away_team}</p>
            </div>
            <div className="modifybet-result-inputs">
              {bet.bet_type === BetType.BetBuilder ||
              bet.bet_type === BetType.Tuplaus ? (
                <div className="modifybet-result-fields-betbuilder">
                  {bet.betbuilder_selection?.map(
                    (_selection, selectionIndex) => (
                      <div key={selectionIndex}>
                        <input
                          key={selectionIndex}
                          name={`betbuilder_result_${selectionIndex}`}
                          value={
                            result[betIndex]?.betbuilder_result[
                              selectionIndex
                            ] ?? ""
                          }
                          onChange={(e) =>
                            handleBetbuilderResultChange(
                              e,
                              betIndex,
                              selectionIndex,
                            )
                          }
                        />
                      </div>
                    ),
                  )}
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
            <div
              className="modifybet-slip-selection"
              style={{ position: "static" }}
            >
              {bet.bet_type === BetType.BetBuilder ||
              bet.bet_type === BetType.Tuplaus ? (
                bet.betbuilder_selection?.map((s, selectionIndex) => (
                  <div
                    key={selectionIndex}
                    className="bet-selection"
                    style={
                      isMobile
                        ? {
                            width: "100%",
                            textAlign: "center",
                            position: "static",
                          }
                        : {}
                    }
                  >
                    {isMobile ? (
                      <div
                        className="tooltip-container"
                        style={{ position: "static" }}
                      >
                        <button
                          className="tooltip-trigger"
                          onMouseEnter={() =>
                            setHoveredSelection({ betIndex, selectionIndex })
                          }
                          onMouseLeave={() => setHoveredSelection(null)}
                          title={s}
                        >
                          <FontAwesomeIcon icon={faCircleInfo} />
                        </button>
                        {hoveredSelection?.betIndex === betIndex &&
                          hoveredSelection?.selectionIndex ===
                            selectionIndex && (
                            <div className="tooltip-content">
                              <span className="tooltip-text">{s}</span>
                              <div className="tooltip-arrow"></div>
                            </div>
                          )}
                      </div>
                    ) : (
                      s
                    )}
                  </div>
                ))
              ) : (
                <p className="bet-selection" title={bet.selection}>
                  {bet.selection}
                </p>
              )}
            </div>
            <div className="modifybet-slip-odds">
              {Number(bet.odds).toFixed(2)}
            </div>
            <div className="modifybet-slip-more">
              <a
                className="modifybet-edit"
                onClick={() => handleModifyBet(betIndex)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </a>
            </div>
          </div>
        ))}
        <FinishModify
          myBet={myBet}
          setMyBet={setMyBet}
          modifyIndex={modifyIndex}
          setModifyIndex={setModifyIndex}
          result={result}
        />
      </div>
    </div>
  );
};
