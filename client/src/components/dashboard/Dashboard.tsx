import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../index";
import "./Dashboard.css";
import {
  faCoins,
  faPenToSquare,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { initMyBets } from "../../slices/betSlice";
import { Bet } from "../../utils/types";
import dayjs from "dayjs";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const userId = 1;

  useEffect(() => {
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

  const totalStake = calculateTotalStake(mybets);
  // Calculate ROI

  const totalProfit = calculateProfit(mybets);
  const totalLosses = calculateTotalLosses(mybets);
  const realProfit = totalProfit - totalLosses;
  const returnPercentage = totalStake > 0 ? (realProfit / totalStake) * 100 : 0;

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

  return (
    <div className="wrapper dashboard-grid" style={{ border: "1px solid red" }}>
      <div className="dash-first">
        <div className="dash-totalbets">
          <FontAwesomeIcon icon={faPenToSquare} size="4x" />
          <div className="dash-helper">
            <h2>{mybets.length}</h2>
            <p>Total bets</p>
          </div>
        </div>
        <div className="dash-returnpercent">
          <FontAwesomeIcon icon={faPercent} size="4x" />
          <div className="dash-helper">
            <h2>{returnPercentage.toFixed(2)}</h2>
            <p>Return %</p>
          </div>
        </div>
        <div className="dash-saldo">
          <FontAwesomeIcon icon={faCoins} size="4x" />
          <div className="dash-helper">
            <h2>{realProfit.toFixed(2)} &euro;</h2>
            <p>Total Profit</p>
          </div>
        </div>
        <div className="dash-addbet">
          <Button
            className="btn big-btn-style"
            type="button"
            children="Add bet"
          />
        </div>
      </div>

      <div className="dash-second">
        <div className="dash-summary">
          <div className="summary-main-header">
            <h5>Summary</h5>
          </div>
          <div className="summary-headers">
            <div></div>
            <p>At Risk</p>
            <p>Payout</p>
            <p>Profit / Loss</p>
            <p>Total Bets</p>
          </div>
          <div className="summary-today">
            <p>Today</p>
            <p>{todaySummary.totalStake.toFixed(2)} &euro;</p>
            <p>{todaySummary.payout.toFixed(2)}&euro;</p>
            <p>{todaySummary.realProfit.toFixed(2)} &euro;</p>
            <p>{todaySummary.totalBets}</p>
          </div>
          <div className="summary-yesterday">
            <p>Yesterday</p>
            <p>{yesterdaySummary.totalStake.toFixed(2)} &euro;</p>
            <p>{yesterdaySummary.payout.toFixed(2)}&euro;</p>
            <p>{yesterdaySummary.realProfit.toFixed(2)} &euro;</p>
            <p>{yesterdaySummary.totalBets}</p>
          </div>
          <div className="summary-7days">
            <p>Last 7 days</p>
            <p>{last7DaysSummary.totalStake.toFixed(2)} &euro;</p>
            <p>{last7DaysSummary.payout.toFixed(2)}&euro;</p>
            <p>{last7DaysSummary.realProfit.toFixed(2)} &euro;</p>
            <p>{last7DaysSummary.totalBets}</p>
          </div>
          <div className="summary-month">
            <p>This month</p>
            <p>{thisMonthSummary.totalStake.toFixed(2)} &euro;</p>
            <p>{thisMonthSummary.payout.toFixed(2)}&euro;</p>
            <p>{thisMonthSummary.realProfit.toFixed(2)} &euro;</p>
            <p>{thisMonthSummary.totalBets}</p>
          </div>
        </div>
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
        </div>
      </div>
    </div>
  );
};
