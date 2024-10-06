import "./MiniSummaryCards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faPenToSquare,
  faPercent,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../index";
import { useAppSelector } from "../../../../store/hooks";
import { betCalculations } from "../summaryUtils";
import { useNavigate } from "react-router-dom";

type MiniSummaryCardProps = {
  icon: IconDefinition;
  header: string;
  info: string;
};

const MiniSummaryCard = ({ icon, header, info }: MiniSummaryCardProps) => (
  <div className="mini-summary-card">
    <FontAwesomeIcon icon={icon} size="4x" />
    <div className="dash-helper">
      <h2>{header}</h2>
      <p>{info}</p>
    </div>
  </div>
);

export const MiniSummaryCards = () => {
  const mybets = useAppSelector((state) => state.bets.allBets);
  const navigate = useNavigate();

  const calculations = betCalculations(mybets);

  return (
    <>
      <MiniSummaryCard
        icon={faPenToSquare}
        header={mybets.length.toString()}
        info="Total bets"
      />
      <MiniSummaryCard
        icon={faPercent}
        header={calculations.returnPercentage.toFixed(2)}
        info="Return %"
      />
      <MiniSummaryCard
        icon={faCoins}
        header={`${calculations.realProfit.toFixed(2)} \u20AC`}
        info="Total Profit"
      />
      <div className="dash-addbet">
        <Button
          className="btn big-btn-style"
          type="button"
          children="Add bet"
          onClick={() => navigate("/add-bet")}
        />
      </div>
    </>
  );
};
