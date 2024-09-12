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
    <div className="wrapper dashboard-grid">
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
      </div>
    </div>
  );
};
