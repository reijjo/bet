import dayjs from "dayjs";
import { useAppSelector } from "../../../../store/hooks";
import "./SummaryCard.css";
import { betCalculations } from "../summaryUtils";

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
  totalBets: string;
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

  const isToday = (date: string) => dayjs(date).isSame(dayjs(), "day");
  const isYesterday = (date: string) =>
    dayjs(date).isSame(dayjs().subtract(1, "day"), "day");
  const isLast7Days = (date: string) =>
    dayjs(date).isAfter(dayjs().subtract(7, "day"));
  const isThisMonth = (date: string) => dayjs(date).isSame(dayjs(), "month");

  const todayBets = mybets.filter((bet) => isToday(bet.date));
  const yesterdayBets = mybets.filter((bet) => isYesterday(bet.date));
  const last7DaysBets = mybets.filter((bet) => isLast7Days(bet.date));
  const thisMonthBets = mybets.filter((bet) => isThisMonth(bet.date));

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
        totalBets={todaySummary.totalStake.toFixed(2)}
      />
      <SummarySection
        period="Yesterday"
        totalStake={yesterdaySummary.totalProfit.toFixed(2)}
        payout={yesterdaySummary.totalProfit.toFixed(2)}
        realProfit={yesterdaySummary.totalProfit.toFixed(2)}
        totalBets={yesterdaySummary.totalProfit.toFixed(2)}
      />
      <SummarySection
        period="Last 7 days"
        totalStake={last7DaysSummary.totalStake.toFixed(2)}
        payout={last7DaysSummary.totalStake.toFixed(2)}
        realProfit={last7DaysSummary.totalStake.toFixed(2)}
        totalBets={last7DaysSummary.totalStake.toFixed(2)}
      />
      <SummarySection
        period="This month"
        totalStake={thisMonthSummary.totalStake.toFixed(2)}
        payout={thisMonthSummary.totalStake.toFixed(2)}
        realProfit={thisMonthSummary.totalStake.toFixed(2)}
        totalBets={thisMonthSummary.totalStake.toFixed(2)}
      />
    </div>
  );
};
