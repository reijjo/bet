import dayjs from "dayjs";

import { Bet } from "../../../utils/types";

// Calculate total stake
const calculateTotalStake = (bets: Bet[]): number => {
  return bets.reduce((acc, bet) => acc + Number(bet.stake), 0);
};

// Calculate combined odds for parlays
export const calculateCombinedOdds = (
  betDetails: { odds: string | number }[],
): number => {
  return parseFloat(
    betDetails
      .reduce((acc, detail) => acc * parseFloat(detail.odds.toString()), 1)
      .toFixed(2),
  );
};

// Calculate profit (for a single bet or parlay)
const calculateProfit = (bets: Bet[]): number => {
  return bets.reduce((acc, bet) => {
    let profit = 0;

    // If the bet is "Won" or "Half Won", calculate profit
    if (bet.status === "Won") {
      const combinedOdds = calculateCombinedOdds(
        bet.betDetails.map((detail) => ({ odds: detail.odds.toString() })),
      );
      profit = combinedOdds * Number(bet.stake) - Number(bet.stake);
    } else if (bet.status === "Half Won") {
      const combinedOdds = calculateCombinedOdds(bet.betDetails);
      profit = (combinedOdds / 2) * (Number(bet.stake) - Number(bet.stake));
    }

    // Treat "Pending", "Void", and other cases as 0 profit
    if (bet.status === "Void") {
      profit = 0;
    }

    return acc + profit;
  }, 0);
};

// Calculate total losses
export const calculateTotalLosses = (bets: Bet[]): number => {
  return bets.reduce((acc, bet) => {
    let loss = 0;

    // If the bet is "Lost" or "Half Lost", calculate the loss
    if (bet.status === "Lost") {
      loss = Number(bet.stake);
    } else if (bet.status === "Half Lost") {
      loss = Number(bet.stake) / 2;
    }

    // Treat "Pending", "Void", and other non-loss cases as 0 loss
    if (bet.status === "Void") {
      loss = 0;
    }

    return acc + loss;
  }, 0);
};

export const calculateTotalPayout = (bets: Bet[]): number => {
  return bets.reduce((acc, bet) => {
    let payout = 0;

    // Calculate payout based on the bet status
    if (bet.status === "Won" || bet.status === "Pending") {
      const combinedOdds = calculateCombinedOdds(
        bet.betDetails.map((detail) => ({ odds: detail.odds.toString() })),
      );
      payout =
        Number(bet.stake) +
        (combinedOdds * Number(bet.stake) - Number(bet.stake));
    } else if (bet.status === "Half Won") {
      const combinedOdds = calculateCombinedOdds(bet.betDetails);
      payout =
        Number(bet.stake) / 2 +
        ((combinedOdds / 2) * Number(bet.stake) - Number(bet.stake) / 2);
    } else if (bet.status === "Lost") {
      payout = 0; // No payout for lost bets
    } else if (bet.status === "Void") {
      payout = Number(bet.stake); // Stake is returned
    }

    return acc + payout;
  }, 0);
};

// Calculate for Bar Chart
export const last4months = (bets: Bet[]) => {
  // const getMonthName = (date: string) => dayjs(date).format("MMM");

  // Filter bets for current month
  const currentMonthBets = bets.filter((bet) =>
    bet.betDetails.some((detail) =>
      dayjs(detail.date).isSame(dayjs(), "month"),
    ),
  );

  // Filter bets for previous month
  const previousMonthBets = bets.filter((bet) =>
    bet.betDetails.some((detail) =>
      dayjs(detail.date).isSame(dayjs().subtract(1, "month"), "month"),
    ),
  );

  // Filter bets for previous month
  const previous2MonthBets = bets.filter((bet) =>
    bet.betDetails.some((detail) =>
      dayjs(detail.date).isSame(dayjs().subtract(2, "month"), "month"),
    ),
  );

  // Filter bets for previous month
  const previous3MonthBets = bets.filter((bet) =>
    bet.betDetails.some((detail) =>
      dayjs(detail.date).isSame(dayjs().subtract(3, "month"), "month"),
    ),
  );

  // Calculate summaries
  const currentMonthSummary = betCalculations(currentMonthBets);
  const previousMonthSummary = betCalculations(previousMonthBets);
  const previous2MonthSummary = betCalculations(previous2MonthBets);
  const previous3MonthSummary = betCalculations(previous3MonthBets);

  return [
    {
      name: dayjs().format("MMM"),
      profit: Number(currentMonthSummary.realProfit.toFixed(2)),
    },
    {
      name: dayjs().subtract(1, "month").format("MMM"),
      profit: Number(previousMonthSummary.realProfit.toFixed(2)),
    },
    {
      name: dayjs().subtract(2, "month").format("MMM"),
      profit: Number(previous2MonthSummary.realProfit.toFixed(2)),
    },
    {
      name: dayjs().subtract(3, "month").format("MMM"),
      profit: Number(previous3MonthSummary.realProfit.toFixed(2)),
    },
  ];
};

export const betCalculations = (bets: Bet[]) => {
  const settledBets = bets.filter((bet) => bet.status !== "Pending");

  const totalStake = calculateTotalStake(bets);
  const totalLosses = calculateTotalLosses(settledBets);
  const totalProfit = calculateProfit(settledBets);
  const totalPayout = calculateTotalPayout(settledBets);
  const realProfit = totalProfit - totalLosses;

  const settledTotalStake = calculateTotalStake(settledBets);
  // const returnPercentage =
  //   settledTotalStake > 0 ? (realProfit / settledTotalStake) * 100 : 0;
  const returnPercentage =
    settledTotalStake > 0 ? (totalPayout / settledTotalStake) * 100 : 0;
  const totalBets = bets.length;

  return {
    totalStake,
    totalProfit,
    totalPayout,
    totalLosses,
    realProfit,
    returnPercentage,
    totalBets,
  };
};

// By period
const isToday = (date: string | Date) => dayjs(date).isSame(dayjs(), "day");
const isYesterday = (date: string | Date) =>
  dayjs(date).isSame(dayjs().subtract(1, "day"), "day");
const isLast7Days = (date: string | Date) =>
  dayjs(date).isAfter(dayjs().subtract(7, "day"));
const isLast30days = (date: string | Date) =>
  dayjs(date).isAfter(dayjs().subtract(30, "day"));

export const periodParser = (myBets: Bet[]) => {
  const todayBets = myBets.filter((bet) =>
    bet.betDetails.some((detail) => isToday(detail.date)),
  );
  const yesterdayBets = myBets.filter((bet) =>
    bet.betDetails.some((detail) => isYesterday(detail.date)),
  );
  const last7DaysBets = myBets.filter((bet) =>
    bet.betDetails.some((detail) => isLast7Days(detail.date)),
  );
  const last30DaysBets = myBets.filter((bet) =>
    bet.betDetails.some((detail) => isLast30days(detail.date)),
  );

  return {
    todayBets,
    yesterdayBets,
    last7DaysBets,
    last30DaysBets,
  };
};
