import "./Dashboard.css";

import { useEffect } from "react";

import { initAllBets } from "../../reducers/betReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  // LatestBetsCard,
  MiniSummaryCards, // MonthlyCard,
  SummaryCard,
  WinPercentCard,
} from "./dashboard-cards";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const allbets = useAppSelector((state) => state.bets.allBets);

  useEffect(() => {
    console.log("in useeffect");
    dispatch(initAllBets());
  }, [dispatch]);

  console.log("BETS", allbets);

  return (
    <div className="wrapper dashboard-grid">
      <MiniSummaryCards />
      <SummaryCard />
      <WinPercentCard />

      {/* <MonthlyCard /> */}
      {/* <LatestBetsCard /> */}
      {/* </div> */}
    </div>
  );
};
