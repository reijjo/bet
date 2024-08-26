import { BetStatus } from "../index";
import "./Dashboard.css";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { initAllBets, initMyBets } from "../../slices/betSlice";
import { Bet } from "../../utils/types";
import dayjs from "dayjs";
import { MiniSummaryCards } from "./dashboard-cards";
import { SummaryCard } from "./dashboard-cards/big-summary-cards/SummaryCard";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const userId = 1;

  useEffect(() => {
    console.log("in useeffect");
    dispatch(initAllBets());
    dispatch(initMyBets(userId));
  }, [dispatch, userId]);

  const allbets = useAppSelector((state) => state.bets.allBets);
  const mybets = useAppSelector((state) => state.bets.myBets);

  console.log("BETS", allbets);
  console.log("MY BETS", mybets);

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

  const calculateTotalStake = (bets: Bet[]): number => {
    return bets.reduce((acc, bet) => acc + bet.stake, 0);
  };

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

  const calculateSummary = (bets: Bet[]) => {
    const totalStake = calculateTotalStake(bets);
    const totalProfit = calculateProfit(bets);
    const totalLosses = calculateTotalLosses(bets);
    const realProfit = totalProfit - totalLosses;
    const payout = totalProfit + totalStake; // or however you calculate payout
    return {
      totalStake,
      payout,
      realProfit,
      totalBets: bets.length,
    };
  };

  // Calculate summaries for each period
  const todaySummary = calculateSummary(todayBets);
  const yesterdaySummary = calculateSummary(yesterdayBets);
  const last7DaysSummary = calculateSummary(last7DaysBets);
  const thisMonthSummary = calculateSummary(thisMonthBets);

  const latestBets = mybets.slice(0, 2);
  console.log("LATEST BETS", latestBets);

  return (
    <div className="wrapper dashboard-grid" style={{ border: "1px solid red" }}>
      <div className="dash-first">
        <MiniSummaryCards />
      </div>

      <div className="dash-second">
        <SummaryCard />
        {/* <div className="summary-today">
            <p>Today</p>
            <p>{todaySummary.totalStake.toFixed(2)} &euro;</p>
            <p>{todaySummary.payout.toFixed(2)} &euro;</p>
            <p>{todaySummary.realProfit.toFixed(2)} &euro;</p>
            <p>{todaySummary.totalBets}</p>
          </div>
          <div className="summary-yesterday">
            <p>Yesterday</p>
            <p>{yesterdaySummary.totalStake.toFixed(2)} &euro;</p>
            <p>{yesterdaySummary.payout.toFixed(2)} &euro;</p>
            <p>{yesterdaySummary.realProfit.toFixed(2)} &euro;</p>
            <p>{yesterdaySummary.totalBets}</p>
          </div>
          <div className="summary-7days">
            <p>Last 7 days</p>
            <p>{last7DaysSummary.totalStake.toFixed(2)} &euro;</p>
            <p>{last7DaysSummary.payout.toFixed(2)} &euro;</p>
            <p>{last7DaysSummary.realProfit.toFixed(2)} &euro;</p>
            <p>{last7DaysSummary.totalBets}</p>
          </div>
          <div className="summary-month">
            <p>This month</p>
            <p>{thisMonthSummary.totalStake.toFixed(2)} &euro;</p>
            <p>{thisMonthSummary.payout.toFixed(2)} &euro;</p>
            <p>{thisMonthSummary.realProfit.toFixed(2)} &euro;</p>
            <p>{thisMonthSummary.totalBets}</p>
          </div> */}
        {/* </div> */}
        <div className="dash-winpercent">
          <h5>Win %</h5>
        </div>
      </div>
      <div className="dash-third">
        <div className="dash-monthly">
          <h5>Monthly results</h5>
        </div>
        <div className="dash-latestbets">
          <h5>Latest bets</h5>
          <div className="latest-headers">
            <p className="latest-bet-header-date">Date</p>
            <p className="latest-bet-header-match">Match</p>
            <p className="latest-bet-header-selection">Selection</p>
            <p className="latest-bet-header-stake">Stake</p>
            <p className="latest-bet-header-odds">Odds</p>
            <p className="latest-bet-header-status">Status</p>
          </div>
          {latestBets.map((bet) => {
            return (
              <div className="latest-bets" key={bet.id}>
                <p>{dayjs(bet.date).format("D MMM")}</p>
                <div className="bets-match">
                  <p className="bet-home-team">{bet.home_team}</p>
                  <p>-</p>
                  <p className="bet-away-team">{bet.away_team}</p>
                </div>
                <p className="bet-selection">{bet.selection}</p>
                <p className="bet-stake">{bet.stake}</p>
                <p className="bet-odds">{bet.odds}</p>
                <BetStatus bet={bet} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
