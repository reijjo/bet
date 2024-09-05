import "./Dashboard.css";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { initAllBets, initMyBets } from "../../slices/betSlice";
import {
  MiniSummaryCards,
  MonthlyCard,
  WinPercentCard,
  SummaryCard,
  LatestBetsCard,
} from "./dashboard-cards";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const userId = 1;

  useEffect(() => {
    console.log("in useeffect");
    dispatch(initAllBets());
    dispatch(initMyBets(userId));
  }, [dispatch, userId]);

  const allbets = useAppSelector((state) => state.bets.allBets);
  const mybets = useAppSelector((state) => state.bets.myBets);

  console.log("BETS", allbets);
  console.log("MY BETS", mybets);

  const latestBets = mybets.slice(0, 2);
  console.log("LATEST BETS", latestBets);

  return (
    <div className="wrapper dashboard-grid" style={{ border: "1px solid red" }}>
      <div className="dash-first">
        <MiniSummaryCards />
      </div>

      <div className="dash-second">
        <SummaryCard />
        <WinPercentCard />
      </div>

      <div className="dash-third">
        <MonthlyCard />
        <LatestBetsCard />
        {/* <div className="dash-latestbets">
          <h5>Latest bets</h5>
          <div className="latest-headers">
            <p className="latest-bet-header-date">Date</p>
            <p className="latest-bet-header-match">Match</p>
            <p className="latest-bet-header-selection">Selection</p>
            <p className="latest-bet-header-stake">Stake</p>
            <p className="latest-bet-header-odds">Odds</p>
            <p className="latest-bet-header-status">Status</p>
          </div>
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
        </div> */}
      </div>
    </div>
  );
};
