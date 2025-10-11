import "./BetToStake.css";

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Bet } from "../../../utils/types";
import { isBetBuilderType } from "../../../pages/add-bet/betUtils";

type BetToStakeProps = {
  myBet: Bet;
  handleModifyBet: (index: number) => void;
};

export const BetToStake = ({ myBet, handleModifyBet }: BetToStakeProps) => {
  return (
    <>
      <div className="finish-mybet-slip-headers">
        <div className="mybet-match">match</div>
        <div className="mybet-selection">selection</div>
        <div className="mybet-odds">odds</div>
        <div className="mybet-more" style={{ visibility: "hidden" }}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
      </div>
      {myBet.betDetails
        .filter((bet) => bet.odds !== "")
        .map((bet) => (
          <div key={bet.id} className="finish-mybet-slip">
            <div className="mybet-slip-match">
              <p className="mybet-slip-hometeam">{bet.home_team}</p>
              <p className="mybet-slip-awayteam">{bet.away_team}</p>
            </div>
            <div className="mybet-slip-selection">
              {!isBetBuilderType(bet.bet_type) ? (
                <p>{bet.selection}</p>
              ) : (
                <>
                  {bet.betbuilder_selection?.map((selection, index) => (
                    <p key={index}>{selection}</p>
                  ))}
                </>
              )}
            </div>
            <div className="mybet-slip-odds">{Number(bet.odds).toFixed(2)}</div>
            <div className="mybet-slip-more">
              <button
                type="button"
                className="mybet-edit"
                onClick={() => handleModifyBet(bet.id as number)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </div>
          </div>
        ))}
    </>
  );
};
