import "./Bets.css";

import { useEffect } from "react";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { initAllBets } from "../../reducers/betReducer";
import { openModifyBet } from "../../reducers/modalReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { BetType } from "../../utils/enums";
import { Bet, BetDetails } from "../../utils/types";
import { Button } from "../common/Button";
import {
  calculateCombinedOdds,
  calculateTotalLosses,
  calculateTotalPayout,
} from "../dashboard/dashboard-cards/summaryUtils";
import { BetStatusChange } from "./BetStatusChange";

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
      case "Pending":
        return "bet-pending";
      default:
        return "";
    }
  };

  const getBetResult = (bet: Bet, parlay: BetDetails): string => {
    let result = "";

    if (bet.bet_type === BetType.BetBuilder) {
      result = parlay.betbuilder_result || "";
    } else {
      result = `${parlay.home_result || ""} - ${parlay.away_result || ""}`;
    }

    return result;
  };

  const parseBetBuilderSelection = (selection: string) => {
    return selection
      .split(",")
      .map((item, index) => <span key={index}>{item.trim()}</span>);
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
              <th className="table-header-date">Date</th>
              <th className="table-header-sport">Sport</th>
              <th className="table-header-match">Match</th>
              <th>Selection</th>
              <th className="table-header-type">Type</th>
              <th className="table-header-result">Result</th>
              <th className="table-header-stake">Stake</th>
              <th className="table-header-odds">Odds</th>
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
                  {bet.betDetails.map((parlay, index) => {
                    const isBetBuilder = bet.bet_type === BetType.BetBuilder;
                    const numberOfLines = parlay.selection.split(",").length;

                    return (
                      <div
                        className="bets-table-matchgrid"
                        key={`${bet.id}-${index}`}
                        style={
                          isBetBuilder
                            ? {
                                height: `${numberOfLines * 1.2}rem`,
                                marginTop: "0.25rem",
                              }
                            : {}
                        }
                      >
                        <p title={parlay.home_team}>{parlay.home_team}</p>
                        <p>-</p>
                        <p title={parlay.away_team}>{parlay.away_team}</p>
                      </div>
                    );
                  })}
                </td>
                <td className="table-selection">
                  {bet.betDetails.map((parlay, index) => (
                    <div
                      key={`${bet.id}-selection-${index}`}
                      className="selection-cell"
                      title={parlay.selection}
                    >
                      {bet.bet_type === BetType.BetBuilder ? (
                        <div className="betbuilder-selections">
                          {parseBetBuilderSelection(parlay.selection)}
                        </div>
                      ) : (
                        <p title={parlay.selection}>{parlay.selection}</p>
                      )}
                    </div>
                  ))}
                </td>
                <td className="table-type">
                  <p title={bet.bet_type}>{bet.bet_type}</p>
                </td>
                <td className="table-result">
                  {bet.betDetails.map((parlay, index) => (
                    <p
                      key={`${bet.id}-result-${index}`}
                      title={getBetResult(bet, parlay)}
                    >
                      {getBetResult(bet, parlay)}
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
