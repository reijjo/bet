import "./Dashboard.css";

import { useGetBetsQuery } from "../../features/api/betsApiSlice";
import {
  LatestBetsCard,
  MiniSummaryCards,
  MonthlyCard,
  SummaryCard,
  WinPercentCard,
} from "./dashboard-cards";

export const Dashboard = () => {
  // const { data: allBets = [], isLoading, isError, error } = useGetBetsQuery();
  const { data: allBets = [] } = useGetBetsQuery();

  console.log("BETS", allBets);

  return (
    <div className="wrapper dashboard-grid">
      <MiniSummaryCards allBets={allBets} />
      <SummaryCard allBets={allBets} />
      <MonthlyCard allBets={allBets} />
      <WinPercentCard allBets={allBets} />
      <LatestBetsCard allBets={allBets} />
    </div>
  );
};
