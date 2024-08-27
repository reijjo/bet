import { useAppSelector } from "../../../../store/hooks";
import "./SummaryCard.css";
import { betCalculations, periodParser } from "../summaryUtils";

export const SummaryHeaders = () => (
  <>
    <div className="summary-main-header">
      <h5>Summary</h5>
    </div>
    <div className="summary-headers">
      <div></div>
      <p>At Risk</p>
      <p>Payout</p>
      <p>Profit / Loss</p>
      <p>Total Bets</p>
    </div>
  </>
);

type SummarySectionProps = {
  period: string;
  totalStake: string;
  payout: string;
  realProfit: string;
  totalBets: number;
};

const SummarySection = ({
  period,
  totalStake,
  payout,
  realProfit,
  totalBets,
}: SummarySectionProps) => (
  <div className="summary-section">
    <p>{period}</p>
    <p>{totalStake} &euro;</p>
    <p>{payout} &euro;</p>
    <p>{realProfit} &euro;</p>
    <p>{totalBets}</p>
  </div>
);

export const SummaryCard = () => {
  const mybets = useAppSelector((state) => state.bets.allBets);
  const { todayBets, yesterdayBets, last7DaysBets, thisMonthBets } =
    periodParser(mybets);

  const todaySummary = betCalculations(todayBets);
  const yesterdaySummary = betCalculations(yesterdayBets);
  const last7DaysSummary = betCalculations(last7DaysBets);
  const thisMonthSummary = betCalculations(thisMonthBets);

  return (
    <div className="dash-summary">
      <SummaryHeaders />
      <SummarySection
        period="Today"
        totalStake={todaySummary.totalStake.toFixed(2)}
        payout={todaySummary.totalStake.toFixed(2)}
        realProfit={todaySummary.totalStake.toFixed(2)}
        totalBets={todaySummary.totalBets}
      />
      <SummarySection
        period="Yesterday"
        totalStake={yesterdaySummary.totalProfit.toFixed(2)}
        payout={yesterdaySummary.totalProfit.toFixed(2)}
        realProfit={yesterdaySummary.totalProfit.toFixed(2)}
        totalBets={yesterdaySummary.totalBets}
      />
      <SummarySection
        period="Last 7 days"
        totalStake={last7DaysSummary.totalStake.toFixed(2)}
        payout={last7DaysSummary.totalStake.toFixed(2)}
        realProfit={last7DaysSummary.totalStake.toFixed(2)}
        totalBets={last7DaysSummary.totalBets}
      />
      <SummarySection
        period="This month"
        totalStake={thisMonthSummary.totalStake.toFixed(2)}
        payout={thisMonthSummary.totalStake.toFixed(2)}
        realProfit={thisMonthSummary.totalStake.toFixed(2)}
        totalBets={thisMonthSummary.totalBets}
      />
    </div>
  );
};
