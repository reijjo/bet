import "./Dashboard.css";

import { useEffect } from "react";

import { initAllBets } from "../../reducers/betReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  LatestBetsCard,
  MiniSummaryCards,
  MonthlyCard,
  SummaryCard,
  WinPercentCard,
} from "./dashboard-cards";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const allbets = useAppSelector((state) => state.bets.allBets);

  useEffect(() => {
    dispatch(initAllBets());
  }, [dispatch]);

  console.log("BETS", allbets);

  return (
    <div className="wrapper dashboard-grid">
      <MiniSummaryCards />
      <SummaryCard />
      <MonthlyCard />
      <WinPercentCard />
      <LatestBetsCard />
    </div>
  );
};
