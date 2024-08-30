import "./WinPercentCard.css";
import { useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Label, Cell } from "recharts";
import { useAppSelector } from "../../../../store/hooks";

type PieData = {
  name: string;
  value: number;
  percent?: number;
};

type PieChartProps = {
  data: PieData[];
  colors: string[];
  hoverText: string | null;
  onHover: (data: PieData | null) => void;
};

const PieChartTest = ({ data, colors, hoverText, onHover }: PieChartProps) => {
  const wonbets = data.filter((b) => b.name === "Won");
  const wonper = wonbets[0].percent;

  console.log("wonper", wonper);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          stroke="none"
          onMouseEnter={(entry) => onHover(entry)}
          onMouseLeave={() => onHover(null)}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}

          <Label
            value={hoverText || `${wonper}`} // Display hover text or default percent
            position="center"
            fill="#000"
            style={{
              fontSize: "1em",
              fontWeight: "bold",
              fill: "var(--text)",
            }}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

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

  const handleHover = (data: PieData | null) => {
    if (data) {
      setHoverData(`${data.name}: ${(data.percent! * 100).toFixed(0)}%`);
    } else {
      setHoverData(defaultHoverText);
    }
  };

  const pieData: PieData[] = [
    {
      name: "Won",
      value:
        mybets.filter((b) => b.status === "Won").length +
        mybets.filter((b) => b.status === "Half Won").length,
      percent: wonPercentage,
    },
    {
      name: "Lost",
      value:
        mybets.filter((b) => b.status === "Lost").length +
        mybets.filter((b) => b.status === "Half Lost").length,
    },
    {
      name: "Void",
      value:
        mybets.filter((b) => b.status === "Void").length +
        mybets.filter((b) => b.status === "Push").length,
    },
  ];

  const colors = [
    "var(--success-light)",
    "var(--secondary-light)",
    "var(--warning-medium)",
  ];

  return (
    <div className="dash-winpercent">
      <h5>Win %</h5>
      <PieChartTest
        data={pieData}
        colors={colors}
        hoverText={hoverData}
        onHover={handleHover}
      />
    </div>
  );
};
