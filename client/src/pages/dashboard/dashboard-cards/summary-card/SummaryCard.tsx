import "./SummaryCard.css";

import { useScreenWidth } from "../../../../hooks/useScreenWidth";
import { Bet } from "../../../../utils/types";
import { betCalculations, periodParser } from "../summaryUtils";

export const SummaryHeaders = () => {
  const { isTablet, isMobile } = useScreenWidth();

  const profitText = isMobile ? "Profit" : "Profit / Loss";

  return (
    <>
      <div className="summary-main-header">
        <h5>Summary</h5>
      </div>
      <div className="summary-headers">
        <div></div>
        <p>At Risk</p>
        <p
          style={
            isTablet || isMobile ? { display: "none" } : { display: "block" }
          }
        >
          Payout
        </p>
        <p>{profitText}</p>
        <p>Total Bets</p>
      </div>
    </>
  );
};

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
}: SummarySectionProps) => {
  const { isTablet, isMobile } = useScreenWidth();

  return (
    <div className="summary-section">
      <p className="summary-section-period">{period}</p>
      <p>{totalStake} €</p>
      <p
        style={
          isTablet || isMobile ? { display: "none" } : { display: "block" }
        }
      >
        {payout} €
      </p>
      <p>{realProfit} €</p>
      <p>{totalBets}</p>
    </div>
  );
};

type SummaryCardProps = {
  allBets: Bet[];
};

export const SummaryCard = ({ allBets }: SummaryCardProps) => {
  // const mybets = useAppSelector((state) => state.bets.allBets);
  const { todayBets, yesterdayBets, last7DaysBets, last30DaysBets } =
    periodParser(allBets);

  const todaySummary = betCalculations(todayBets);
  const yesterdaySummary = betCalculations(yesterdayBets);
  const last7DaysSummary = betCalculations(last7DaysBets);
  const last30DaysSummary = betCalculations(last30DaysBets);

  return (
    <div className="dash-summary">
      <SummaryHeaders />
      <SummarySection
        period="Today"
        totalStake={todaySummary.totalStake.toFixed(2)}
        payout={todaySummary.totalPayout.toFixed(2)}
        realProfit={todaySummary.realProfit.toFixed(2)}
        totalBets={todaySummary.totalBets}
      />
      <SummarySection
        period="Yesterday"
        totalStake={yesterdaySummary.totalStake.toFixed(2)}
        payout={yesterdaySummary.totalPayout.toFixed(2)}
        realProfit={yesterdaySummary.realProfit.toFixed(2)}
        totalBets={yesterdaySummary.totalBets}
      />
      <SummarySection
        period="Last 7 days"
        totalStake={last7DaysSummary.totalStake.toFixed(2)}
        payout={last7DaysSummary.totalPayout.toFixed(2)}
        realProfit={last7DaysSummary.realProfit.toFixed(2)}
        totalBets={last7DaysSummary.totalBets}
      />
      <SummarySection
        period="Last 30 days"
        totalStake={last30DaysSummary.totalStake.toFixed(2)}
        payout={last30DaysSummary.totalPayout.toFixed(2)}
        realProfit={last30DaysSummary.realProfit.toFixed(2)}
        totalBets={last30DaysSummary.totalBets}
      />
    </div>
  );
};
