import "./MonthlyCard.css";
import { PosNegBarChartDashboard } from "../../../charts";

export const MonthlyCard = () => {
  return (
    <div className="dash-monthly">
      <h5>Monthly results</h5>
      <PosNegBarChartDashboard />
    </div>
  );
};
