import dayjs from "dayjs";
import { Bet } from "../../../utils/types";

// Calculate total stake
const calculateTotalStake = (bets: Bet[]): number => {
  return bets.reduce((acc, bet) => acc + Number(bet.stake), 0);
};

// Calculate combined odds for parlays
const calculateCombinedOdds = (
  betDetails: { odds: string | number }[]
): number => {
  return parseFloat(
    betDetails
      .reduce((acc, detail) => acc * parseFloat(detail.odds.toString()), 1)
      .toFixed(2)
  );
};

// Calculate profit (for a single bet or parlay)
const calculateProfit = (bets: Bet[]): number => {
  return bets.reduce((acc, bet) => {
    let profit = 0;

    // If the bet is "Won" or "Half Won", calculate profit
    if (bet.status === "Won") {
      const combinedOdds = calculateCombinedOdds(
        bet.betDetails.map((detail) => ({ odds: detail.odds.toString() }))
      );
      profit = combinedOdds * (Number(bet.stake) - Number(bet.stake));
    } else if (bet.status === "Half Won") {
      const combinedOdds = calculateCombinedOdds(bet.betDetails);
      profit = (combinedOdds / 2) * (Number(bet.stake) - Number(bet.stake));
    }

    // Treat "Pending", "Void", and other cases as 0 profit
    if (
      bet.status === "Pending" ||
      bet.status === "Void" ||
      bet.status === "Push"
    ) {
      profit = 0;
    }

    return acc + profit;
  }, 0);
};

// Calculate total losses
const calculateTotalLosses = (bets: Bet[]): number => {
  return bets.reduce((acc, bet) => {
    let loss = 0;

    // If the bet is "Lost" or "Half Lost", calculate the loss
    if (bet.status === "Lost") {
      loss = Number(bet.stake);
    } else if (bet.status === "Half Lost") {
      loss = Number(bet.stake) / 2;
    }

    // Treat "Pending", "Void", and other non-loss cases as 0 loss
    if (
      bet.status === "Pending" ||
      bet.status === "Void" ||
      bet.status === "Push"
    ) {
      loss = 0;
    }

    return acc + loss;
  }, 0);
};

export const betCalculations = (bets: Bet[]) => {
  const totalStake = calculateTotalStake(bets);
  const totalProfit = calculateProfit(bets);
  const totalLosses = calculateTotalLosses(bets);
  const realProfit = totalProfit - totalLosses;

  const returnPercentage = totalStake > 0 ? (realProfit / totalStake) * 100 : 0;
  const totalBets = bets.length;

  return {
    totalStake,
    totalProfit,
    totalLosses,
    realProfit,
    returnPercentage,
    totalBets,
  };
};

// By period
const isToday = (date: string) => dayjs(date).isSame(dayjs(), "day");
const isYesterday = (date: string) =>
  dayjs(date).isSame(dayjs().subtract(1, "day"), "day");
const isLast7Days = (date: string) =>
  dayjs(date).isAfter(dayjs().subtract(7, "day"));
const isThisMonth = (date: string) => dayjs(date).isSame(dayjs(), "month");

export const periodParser = (myBets: Bet[]) => {
  const todayBets = myBets.filter((bet) =>
    bet.betDetails.some((detail) => isToday(detail.date))
  );
  const yesterdayBets = myBets.filter((bet) =>
    bet.betDetails.some((detail) => isYesterday(detail.date))
  );
  const last7DaysBets = myBets.filter((bet) =>
    bet.betDetails.some((detail) => isLast7Days(detail.date))
  );
  const thisMonthBets = myBets.filter((bet) =>
    bet.betDetails.some((detail) => isThisMonth(detail.date))
  );

  return {
    todayBets,
    yesterdayBets,
    last7DaysBets,
    thisMonthBets,
  };
};
