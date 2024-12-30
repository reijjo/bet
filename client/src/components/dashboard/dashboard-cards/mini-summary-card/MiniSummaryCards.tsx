import "./MiniSummaryCards.css";

import {
  IconDefinition,
  faCoins,
  faPenToSquare,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useScreenWidth } from "../../../../hooks/useScreenWidth";
import { Bet } from "../../../../utils/types";
import { betCalculations } from "../summaryUtils";

type MiniSummaryCardProps = {
  icon: IconDefinition;
  header: string;
  info: string;
  className?: string;
};

const MiniSummaryCard = ({
  icon,
  header,
  info,
  className,
}: MiniSummaryCardProps) => {
  const { isMobile, isTablet } = useScreenWidth();
  const iconSize = () => {
    if (isMobile) return "2x";
    if (isTablet) return "2x";
    return "3x";
  };

  return (
    <div className={`mini-summary-card ${className}`}>
      <FontAwesomeIcon icon={icon} size={`${iconSize()}`} />
      <div className={`dash-helper ${className}`}>
        <h3 className="mini-summary-header">{header}</h3>
        <p>{info}</p>
      </div>
    </div>
  );
};

type AllBetsProp = {
  allBets: Bet[];
};

export const MiniSummaryCards = ({ allBets }: AllBetsProp) => {
  // const navigate = useNavigate();

  const calculations = betCalculations(allBets);

  return (
    <div className="mini-summary-wrapper">
      <MiniSummaryCard
        icon={faPenToSquare}
        header={allBets.length.toString()}
        info="Total bets"
        className="mini-summary-totalbets"
      />
      <MiniSummaryCard
        icon={faPercent}
        header={calculations.returnPercentage.toFixed(2)}
        info="Return %"
        className="mini-summary-return"
      />
      <MiniSummaryCard
        icon={faCoins}
        header={`${calculations.realProfit.toFixed(2)} \u20AC`}
        info="Total Profit"
        className="mini-summary-profit"
      />
    </div>
  );
};
