import { BetDetails } from "../utils/types";

export const useBetCalculations = () => {
  const finalOdds = (betDetails: BetDetails[]) => {
    return parseFloat(
      betDetails.reduce((acc, bet) => acc * Number(bet.odds), 1).toFixed(2),
    );
  };

  return { finalOdds };
};
