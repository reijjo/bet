import { Bet } from "../../../utils/types";
import "./BetStatus.css";

type BetStatusProps = {
  bet: Bet;
};

export const BetStatus = ({ bet }: BetStatusProps) => {
  // const sign = bet.status === "Won" || bet.status === "Half Won" ? "+" : "-";
  // const noSign =
  //   bet.status === "Push" || bet.status === "Void" || bet.status === "Pending"
  //     ? ""
  //     : sign;

  const endedBetSign = (bet: Bet) => {
    if (bet.status === "Won" || bet.status === "Half Won") {
      return "+";
    } else if (bet.status === "Lost" || bet.status === "Half Lost") {
      return "-";
    } else {
      return "";
    }
  };

  const endedBetBallColor = (bet: Bet) => {
    if (bet.status === "Won" || bet.status === "Half Won") {
      return "bet-status-won";
    } else if (bet.status === "Lost" || bet.status === "Half Lost") {
      return "bet-status-lost";
    } else if (bet.status === "Push" || bet.status === "Void") {
      return "bet-status-void";
    } else {
      return "bet-status-pending";
    }
  };

  const endedBetColorcode = (bet: Bet) => {
    if (bet.status === "Won" || bet.status === "Half Won") {
      return "bet-profit-won";
    } else if (bet.status === "Lost" || bet.status === "Half Lost") {
      return "bet-profit-lost";
    } else {
      return "bet-profit-pending";
    }
  };

  const endedBetProfit = (bet: Bet) => {
    if (bet.status === "Won" || bet.status === "Half Won") {
      return (bet.odds * bet.stake - bet.stake).toFixed(2);
    } else if (bet.status === "Lost" || bet.status === "Half Lost") {
      return bet.stake.toFixed(2);
    } else if (bet.status === "Push" || bet.status === "Void") {
      return "0";
    } else {
      return "...";
    }
  };

  return (
    <div className="bet-status-container">
      <div className="bet-status">
        <div className={`bet-status-ball ${endedBetBallColor(bet)}`}></div>
        <p>{bet.status}</p>
      </div>
      <p className={`bet-profit ${endedBetColorcode(bet)} `}>
        {endedBetSign(bet)}
        {endedBetProfit(bet)} &euro;
      </p>
    </div>
  );
};
