import "./BetStatus.css";

import { Bet } from "../../../../utils/types";

type BetStatusProps = {
  bet: Bet;
};

const calculateCombinedOdds = (
  betDetails: { odds: string | number }[]
): number => {
  return parseFloat(
    betDetails
      .reduce((acc, detail) => acc * parseFloat(detail.odds.toString()), 1)
      .toFixed(2)
  );
};

export const BetStatus = ({ bet }: BetStatusProps) => {
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
    } else if (bet.status === "Void") {
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
    const combinedOdds = calculateCombinedOdds(
      bet.betDetails.map((detail) => ({ odds: detail.odds.toString() }))
    );

    const isFreeBet = bet.betDetails.some((detail) => detail.freebet === true);

    if (bet.status === "Won" || bet.status === "Half Won") {
      return (combinedOdds * Number(bet.stake) - Number(bet.stake)).toFixed(2);
    } else if (bet.status === "Lost" || bet.status === "Half Lost") {
      return isFreeBet ? Number(0).toFixed(2) : Number(bet.stake).toFixed(2);
    } else if (bet.status === "Void") {
      return "0";
    } else {
      return "... ";
    }
  };

  return (
    <div className="bet-status-container">
      <div className={`bet-status-latest ${endedBetColorcode(bet)}`}>
        <p className="bet-status-latest-text">{bet.status}</p>
        <div
          className={`bet-status-ball-latest ${endedBetBallColor(bet)}`}
        ></div>
      </div>
      <p
        className={`bet-profit ${endedBetColorcode(bet)} `}
        title={`${endedBetProfit(bet)} &euro;`}
      >
        {endedBetSign(bet)}
        {endedBetProfit(bet)} &euro;
      </p>
    </div>
  );
};
