import "./LatestBetsCard.css";

import dayjs from "dayjs";
import { useAppSelector } from "../../../../store/hooks";
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
  const latestBets = mybets.slice(0, 2);

  return (
    <>
      {latestBets.map((bet) => {
        return (
          <div className="latest-bets" key={bet.id}>
            <p>{dayjs(bet.date).format("D MMM")}</p>
            <div className="bets-match">
              <p className="bet-home-team">{bet.home_team}</p>
              <p>-</p>
              <p className="bet-away-team">{bet.away_team}</p>
            </div>
            <p className="bet-selection">{bet.selection}</p>
            <p className="bet-stake">{bet.stake}</p>
            <p className="bet-odds">{bet.odds}</p>
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
