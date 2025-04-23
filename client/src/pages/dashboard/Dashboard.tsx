import "./Dashboard.css";

import { Error, Loading } from "../../components";
import { useGetBetsQuery } from "../../features/api/betsApiSlice";
import {
  LatestBetsCard,
  MiniSummaryCards,
  MonthlyCard,
  SummaryCard,
  WinPercentCard,
} from "./dashboard-cards";

export const Dashboard = () => {
  const { data: allBets = [], isLoading, isError, error } = useGetBetsQuery();

  console.log("BETS", allBets[0]);

  if (isLoading)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
        <Loading text="Loading dashboard..." />
      </div>
    );
  if (isError) return <Error error={error} />;

  return (
    <div className="dashboard-page">
      <div className="wrapper dashboard-grid">
        <MiniSummaryCards allBets={allBets} />
        <SummaryCard allBets={allBets} />
        <MonthlyCard allBets={allBets} />
        <WinPercentCard allBets={allBets} />
        <LatestBetsCard allBets={allBets} />
      </div>
    </div>
  );
};
