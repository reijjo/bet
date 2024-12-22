import "./LatestBetsCard.css";

import dayjs from "dayjs";
import { Fragment } from "react/jsx-runtime";

import { openModifyBet } from "../../../../reducers/modalReducer";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { BetType } from "../../../../utils/enums";
import { calculateCombinedOdds } from "../summaryUtils";
import { BetStatus } from "./BetStatus";

const LatestHeaders = () => (
  <div className="latest-headers">
    <p className="latest-bet-header-date">Date</p>
    <p className="latest-bet-header-match">Match</p>
    <p className="latest-bet-header-selection">Selection</p>
    <p className="latest-bet-header-stake">Stake</p>
    <p className="latest-bet-header-odds">Odds</p>
    <p className="latest-bet-header-status">Status</p>
  </div>
);

const LatestBets = () => {
  const mybets = useAppSelector((state) => state.bets.allBets);
  const latestBets = mybets.slice(0, 3);
  const dispatch = useAppDispatch();

  const modifybet = (id: number | string) => {
    dispatch(openModifyBet(id));
  };

  if (mybets.length === 0) {
    return (
      <p
        style={{
          display: "grid",
          placeContent: "center",
          gridRow: "3 / span 4",
        }}
      >
        No settled bets yet.
      </p>
    );
  }

  return (
    <>
      {latestBets.map((bet) => {
        return (
          <a
            className="latest-bets"
            key={bet.id}
            onClick={() => modifybet(String(bet.id))}
          >
            <p className="latest-bet-data-date">
              {dayjs(bet.betDetails[0].date).format("D MMM")}
            </p>
            <div className="bets-match">
              <div className="parlay-div">
                {bet.betDetails.map((parlay, index) => (
                  <p
                    className="bet-home-team"
                    key={index}
                    title={parlay.home_team}
                  >
                    {parlay.home_team}
                  </p>
                ))}
              </div>
              <div className="parlay-div">
                {bet.betDetails.map((_parlay, index) => (
                  <p className="bet-vs" key={index}>
                    -
                  </p>
                ))}
              </div>
              <div className="parlay-div">
                {bet.betDetails.map((parlay, index) => (
                  <p
                    className="bet-home-team"
                    key={index}
                    title={parlay.away_team}
                  >
                    {parlay.away_team}
                  </p>
                ))}
              </div>
            </div>
            <div className="parlay-div">
              {bet.betDetails.map((parlay, index) => (
                <Fragment key={index}>
                  {parlay.bet_type === BetType.BetBuilder ||
                  parlay.bet_type === BetType.Tuplaus ? (
                    <div className="parlay-div">
                      {parlay.betbuilder_selection?.map((s, index) => (
                        <p key={index} title={s}>
                          {s}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="bet-selection" title={parlay.selection}>
                      {parlay.selection}
                    </p>
                  )}
                </Fragment>
              ))}
            </div>
            <p className="bet-stake">{Number(bet.stake).toFixed(2)} &euro;</p>
            <p className="bet-odds">
              {calculateCombinedOdds(bet.betDetails).toFixed(2)}
            </p>
            <BetStatus bet={bet} />
          </a>
        );
      })}
    </>
  );
};

export const LatestBetsCard = () => {
  return (
    <div className="dash-latestbets">
      <h5>Latest bets</h5>
      <LatestHeaders />
      <LatestBets />
    </div>
  );
};
