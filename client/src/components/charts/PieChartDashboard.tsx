import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Bet } from "../../utils/types";

export type PieChartDashboardData = {
  name: string;
  value: number;
  percent?: number;
};

type PieChartDashboardProps = {
  myBets: Bet[];
  hoverText: string | null;
  onHover: (data: PieChartDashboardData | null) => void;
};

export const PieChartDashboard = ({
  myBets,
  hoverText,
  onHover,
}: PieChartDashboardProps) => {
  const pieData: PieChartDashboardData[] = [
    {
      name: "Won",
      value:
        myBets.filter((b) => b.status === "Won").length +
        myBets.filter((b) => b.status === "Half Won").length,
    },
    {
      name: "Lost",
      value:
        myBets.filter((b) => b.status === "Lost").length +
        myBets.filter((b) => b.status === "Half Lost").length,
    },
    {
      name: "Void",
      value: myBets.filter((b) => b.status === "Void").length,
    },
  ];

  const colors = [
    "var(--ok-light)",
    "rgb(241, 182, 167)",
    "var(--warning-medium)",
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={"80%"}
          outerRadius={"100%"}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
          stroke="none"
          onMouseEnter={(entry) => onHover(entry)}
          onMouseLeave={() => onHover(null)}
        >
          {pieData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}

          <Label
            value={hoverText || 0}
            position="center"
            fill="#000"
            style={{
              fontSize: "var(--font-small)",
              fontWeight: "bold",
              fill: "var(--text)",
            }}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
