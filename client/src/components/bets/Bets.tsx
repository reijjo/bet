import "./Bets.css";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  calculateTotalPayout,
  calculateTotalLosses,
  calculateCombinedOdds,
} from "../dashboard/dashboard-cards/summaryUtils";
import { Bet } from "../../utils/types";
import { BetStatusChange } from "./BetStatusChange";
import { useEffect } from "react";
import { initAllBets } from "../../reducers/betReducer";
import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";
import { openModifyBet } from "../../reducers/modalReducer";
// import { BetStatus } from "../dashboard/dashboard-cards";

export const Bets = () => {
  const allbets = useAppSelector((state) => state.bets.allBets);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initAllBets());
  }, [dispatch]);

  const payout = (bet: Bet) => {
    const payout = calculateTotalPayout([bet]);
    const losses = calculateTotalLosses([bet]);
    return payout - losses;
  };

  const getRowColor = (status: string) => {
    switch (status) {
      case "Won":
        return "bet-won";
      case "Lost":
        return "bet-lost";
      case "Void":
        return "bet-void";
      default:
        return "";
    }
  };

  const modifybet = (id: number | string) => {
    dispatch(openModifyBet(id));
  };

  return (
    <div className="wrapper">
      <div className="header-row">
        <h1>Bets</h1>
        <Button
          className="btn big-btn-style"
          type="button"
          children="Add bet"
          onClick={() => navigate("/add-bet")}
        />
      </div>
      <div className="bets-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Sport</th>
              <th>Match</th>
              <th>Selection</th>
              <th>Type</th>
              <th>Result</th>
              <th>Stake</th>
              <th>Odds</th>
              <th>Status</th>
              <th>Payout</th>
            </tr>
          </thead>
          <tbody>
            {allbets.map((bet) => (
              <tr
                key={bet.id}
                className={getRowColor(bet.status)}
                onClick={() => modifybet(String(bet.id))}
              >
                <td className="table-date">
                  <p title={dayjs(bet.betDetails[0].date).format("D MMM")}>
                    {dayjs(bet.betDetails[0].date).format("D MMM")}
                  </p>
                </td>
                <td className="table-sport">
                  <p title={bet.sport}>{bet.sport}</p>
                </td>
                <td className="table-match">
                  {bet.betDetails.map((parlay, index) => (
                    <div
                      className="bets-table-matchgrid"
                      key={`${bet.id}-${index}`}
                    >
                      <p title={parlay.home_team}>{parlay.home_team}</p>
                      <p>-</p>
                      <p title={parlay.away_team}>{parlay.away_team}</p>
                    </div>
                  ))}
                </td>
                <td className="table-selection">
                  {bet.betDetails.map((parlay, index) => (
                    <p
                      key={`${bet.id}-selection-${index}`}
                      title={parlay.selection}
                    >
                      {parlay.selection}
                    </p>
                  ))}
                </td>
                <td className="table-type">
                  <p title={bet.bet_type}>{bet.bet_type}</p>
                </td>
                <td className="table-result">
                  {bet.betDetails.map((parlay, index) => (
                    <p key={`${bet.id}-result-${index}`} title={parlay.result}>
                      {parlay.result}
                    </p>
                  ))}
                </td>
                <td className="table-stake">
                  {Number(bet.stake).toFixed(2)} &euro;
                </td>
                <td className="table-odds">
                  {calculateCombinedOdds(bet.betDetails).toFixed(2)}
                </td>
                <td className="table-status">
                  <BetStatusChange bet={bet} />
                </td>
                <td className="table-winloss">
                  {payout(bet).toFixed(2)} &euro;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
