import "./Dashboard.css";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { initAllBets } from "../../reducers/betReducer";
import {
  MiniSummaryCards,
  MonthlyCard,
  WinPercentCard,
  SummaryCard,
  LatestBetsCard,
} from "./dashboard-cards";

export const Dashboard = () => {
  const dispatch = useAppDispatch();

  const allbets = useAppSelector((state) => state.bets.allBets);

  useEffect(() => {
    console.log("in useeffect");
    dispatch(initAllBets());
  }, [dispatch]);

  console.log("BETS", allbets);

  const latestBets = allbets.slice(0, 2);
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
