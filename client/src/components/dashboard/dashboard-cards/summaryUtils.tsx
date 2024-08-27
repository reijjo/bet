import dayjs from "dayjs";
import { Bet } from "../../../utils/types";

// Calculate total stake
const calculateTotalStake = (bets: Bet[]): number => {
  return bets.reduce((acc, bet) => acc + bet.stake, 0);
};

// Calculate profit
const calculateProfit = (bets: Bet[]): number => {
  return bets.reduce((acc, bet) => {
    let profit = 0;
    if (bet.status === "Won") {
      profit = bet.odds * bet.stake - bet.stake;
    } else if (bet.status === "Half Won") {
      profit = (bet.odds / 2) * bet.stake - bet.stake;
    }
    return acc + profit;
  }, 0);
};

// Calculate total losses
const calculateTotalLosses = (bets: Bet[]): number => {
  return bets.reduce((acc, bet) => {
    let loss = 0;
    if (bet.status === "Lost") {
      loss = bet.stake;
    } else if (bet.status === "Half Lost") {
      loss = bet.stake / 2;
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
  const todayBets = myBets.filter((bet) => isToday(bet.date));
  const yesterdayBets = myBets.filter((bet) => isYesterday(bet.date));
  const last7DaysBets = myBets.filter((bet) => isLast7Days(bet.date));
  const thisMonthBets = myBets.filter((bet) => isThisMonth(bet.date));

  return {
    todayBets,
    yesterdayBets,
    last7DaysBets,
    thisMonthBets,
  };
};
