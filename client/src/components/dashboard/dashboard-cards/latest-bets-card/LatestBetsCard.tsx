import "./LatestBetsCard.css";

import dayjs from "dayjs";
import { useAppSelector } from "../../../../store/hooks";
import { BetStatus } from "./BetStatus";
import { calculateCombinedOdds } from "../summaryUtils";

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
  const latestBets = mybets.slice(0, 2);

  return (
    <>
      {latestBets.map((bet) => {
        return (
          <div className="latest-bets" key={bet.id}>
            <p>{dayjs(bet.betDetails[0].date).format("D MMM")}</p>
            <div className="bets-match">
              <div className="parlay-div">
                {bet.betDetails.map((parlay, index) => (
                  <p className="bet-home-team" key={index}>
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
                  <p className="bet-home-team" key={index}>
                    {parlay.away_team}
                  </p>
                ))}
              </div>
            </div>
            <div className="parlay-div">
              {bet.betDetails.map((parlay, index) => (
                <p
                  className="bet-selection"
                  key={index}
                  title={parlay.selection}
                >
                  {parlay.selection}
                </p>
              ))}
            </div>
            <p className="bet-stake">{Number(bet.stake).toFixed(2)} &euro;</p>
            <p className="bet-odds">
              {calculateCombinedOdds(bet.betDetails).toFixed(2)}
            </p>
            <BetStatus bet={bet} />
          </div>
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
