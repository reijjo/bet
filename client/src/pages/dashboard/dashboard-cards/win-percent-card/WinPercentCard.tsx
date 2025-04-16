import "./WinPercentCard.css";

import { useEffect, useState } from "react";

import {
  PieChartDashboard,
  PieChartDashboardData,
} from "../../../../components";
import { allBetsProp } from "../../../../utils/types";

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
        <PieChartDashboard
          myBets={settledBets}
          hoverText={hoverData}
          onHover={handleHover}
        />
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
