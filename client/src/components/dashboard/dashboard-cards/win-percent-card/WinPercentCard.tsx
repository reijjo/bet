import "./WinPercentCard.css";

import { Suspense, useEffect, useState } from "react";

import { allBetsProp } from "../../../../utils/types";
import { PieChartDashboard } from "../../../charts";
import { PieChartDashboardData } from "../../../charts/PieChartDashboard";

export const WinPercentCard = ({ allBets }: allBetsProp) => {
  const [hoverData, setHoverData] = useState("");

  const settledBets = allBets.filter((b) => b.status !== "Pending");
  const wonBetsCount =
    settledBets.filter((b) => b.status === "Won").length +
    settledBets.filter((b) => b.status === "Half Won").length;
  const totalBetsCount = settledBets.length;
  const wonPercentage = totalBetsCount > 0 ? wonBetsCount / totalBetsCount : 0;
  const defaultHoverText = `Won: ${(wonPercentage * 100).toFixed(0)}%`;

  useEffect(() => {
    setHoverData(defaultHoverText);
  }, [defaultHoverText]);

  const handleHover = (data: PieChartDashboardData | null) => {
    if (data) {
      setHoverData(`${data.name}: ${(data.percent! * 100).toFixed(0)}%`);
    } else {
      setHoverData(defaultHoverText);
    }
  };

  return (
    <div className="dash-winpercent">
      <h5>Win %</h5>
      {settledBets.length > 0 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <PieChartDashboard
            myBets={settledBets}
            hoverText={hoverData}
            onHover={handleHover}
          />
        </Suspense>
      ) : (
        <p
          style={{
            alignContent: "center",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          No settled bets yet.
        </p>
      )}
    </div>
  );
};
