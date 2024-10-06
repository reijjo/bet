import "./WinPercentCard.css";
import { Suspense, useEffect, useState } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { PieChartDashboard } from "../../../charts";
import { PieChartDashboardData } from "../../../charts/PieChartDashboard";

export const WinPercentCard = () => {
  const [hoverData, setHoverData] = useState<string>("Loading...");

  const mybets = useAppSelector((state) => state.bets.allBets);

  useEffect(() => {
    if (mybets.length > 0) {
      const wonBetsCount =
        mybets.filter((b) => b.status === "Won").length +
        mybets.filter((b) => b.status === "Half Won").length;

      const totalBetsCount = mybets.filter(
        (b) => b.status !== "Pending"
      ).length;

      const wonPercentage =
        totalBetsCount > 0 ? wonBetsCount / totalBetsCount : 0;

      const defaultHoverText = `Won: ${(wonPercentage * 100).toFixed(0)}%`;

      setHoverData(defaultHoverText);
    }
  }, [mybets]);

  const handleHover = (data: PieChartDashboardData | null) => {
    if (data) {
      setHoverData(`${data.name}: ${(data.percent! * 100).toFixed(0)}%`);
    } else {
      const wonBetsCount =
        mybets.filter((b) => b.status === "Won").length +
        mybets.filter((b) => b.status === "Half Won").length;

      const totalBetsCount = mybets.filter(
        (b) => b.status !== "Pending"
      ).length;

      const wonPercentage =
        totalBetsCount > 0 ? wonBetsCount / totalBetsCount : 0;

      const defaultHoverText = `Won: ${(wonPercentage * 100).toFixed(0)}%`;

      setHoverData(defaultHoverText);
    }
  };

  return (
    <div className="dash-winpercent">
      <h5>Win %</h5>
      <Suspense fallback={<div>Loading...</div>}>
        <PieChartDashboard
          myBets={mybets}
          hoverText={hoverData}
          onHover={handleHover}
        />
      </Suspense>
    </div>
  );
};
