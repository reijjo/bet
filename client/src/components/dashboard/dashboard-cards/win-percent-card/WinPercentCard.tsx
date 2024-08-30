import "./WinPercentCard.css";
import { PieChartDashboard } from "../../../charts";
import { useState } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { PieChartDashboardData } from "../../../charts/PieChartDashboard";

export const WinPercentCard = () => {
  const mybets = useAppSelector((state) => state.bets.allBets);

  const wonBetsCount =
    mybets.filter((b) => b.status === "Won").length +
    mybets.filter((b) => b.status === "Half Won").length;

  console.log("wonBetsCount: ", wonBetsCount);

  const totalBetsCount = mybets.filter((b) => b.status !== "Pending").length;

  console.log("totlaBetsCount: ", totalBetsCount);

  // Calculate the default percentage for "Won" bets
  const wonPercentage = wonBetsCount / totalBetsCount;

  const defaultHoverText = `Won: ${(wonPercentage * 100).toFixed(0)}%`;

  // Initialize hoverData with the default "Won" percentage
  const [hoverData, setHoverData] = useState<string>(defaultHoverText);

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
      <PieChartDashboard
        myBets={mybets}
        hoverText={hoverData}
        onHover={handleHover}
      />
    </div>
  );
};
