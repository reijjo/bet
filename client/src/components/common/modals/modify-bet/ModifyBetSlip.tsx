import "./ModifyBetSlip.css";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Bet } from "../../../../utils/types";
import { BetType } from "../../../../utils/enums";
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
    betbuilder_result: string;
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

  useEffect(() => {
    const initialResult: Result = {};
    myBet.betDetails.forEach((bet, index) => {
      initialResult[index] = {
        home_result: bet.home_result || "",
        away_result: bet.away_result || "",
        betbuilder_result: bet.betbuilder_result || "",
      };
    });
    setResult(initialResult);
  }, [myBet]);

  console.log("result", result);

  const handleResultChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
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
  console.log("TAMA NTTR", myBet);

  return (
    <div className="modifybet-container" id="">
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
        {myBet.betDetails.map((bet, index) => (
          <div key={index} className="finish-modifybet-slip">
            <div className="modifybet-slip-match">
              <p className="modifybet-slip-hometeam">{bet.home_team}</p>
              <p className="modifybet-slip-awayteam">{bet.away_team}</p>
            </div>
            <div className="modifybet-result-inputs">
              // TODO: As many input fields for the result than there is
              selections
              {myBet.bet_type === BetType.BetBuilder ? (
                <div className="modifybet-result-fields-betbuilder">
                  <input
                    name="betbuilder_result"
                    id="betbuilder_result"
                    value={result[index]?.betbuilder_result || ""}
                    onChange={(e) => handleResultChange(e, index)}
                  />
                </div>
              ) : (
                <div className="modifybet-result-fields">
                  <input
                    name="home_result"
                    id="home_result"
                    value={result[index]?.home_result || ""}
                    onChange={(e) => handleResultChange(e, index)}
                  />
                  <input
                    name="away_result"
                    id="away_result"
                    value={result[index]?.away_result || ""}
                    onChange={(e) => handleResultChange(e, index)}
                  />
                </div>
              )}
            </div>
            <div className="modifybet-slip-selection">
              <p className="bet-selection">{bet.selection}</p>
            </div>

            <div className="modifybet-slip-odds">
              {Number(bet.odds).toFixed(2)}
            </div>
            <div className="modifybet-slip-more">
              <a
                className="modifybet-edit"
                onClick={() => handleModifyBet(index)}
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
