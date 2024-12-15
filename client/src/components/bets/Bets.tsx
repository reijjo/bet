import "./Bets.css";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { initAllBets } from "../../reducers/betReducer";
import { openModifyBet } from "../../reducers/modalReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getRowColor } from "../../utils/helperFunctions";
import { Button } from "../common/Button";
import {
  BetStatusChange,
  DateBetsTable,
  HeadersBetsTable,
  OddsBetsTable,
  PayoutBetsTable,
  ResultBetsTable,
  SelectionBetsTable,
  SportBetsTable,
  StakeBetsTable,
  TypeBetsTable,
} from "./bets-table";

export const Bets = () => {
  const allbets = useAppSelector((state) => state.bets.allBets);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initAllBets());
  }, [dispatch]);

  const modifybet = (id: number | string) => {
    dispatch(openModifyBet(id));
  };

  return (
    <div className="wrapper">
      <h1>Bets</h1>
      <div className="bets-filters">
        <div className="filters-list">
          <p>Sort by</p>
          <ul>
            <li>
              <span>Date</span>
              <ul className="multi-level-dropdown">
                <li>Latest</li>
                <li>Oldest</li>
              </ul>
            </li>
            <li>
              <span>Sport</span>
            </li>
            <li>
              <span>Type</span>
            </li>
            <li>
              <span>Stake</span>
            </li>
            <li>
              <span>Odds</span>
            </li>
            <li>
              <span>Status</span>
            </li>
            <li>
              <span>Payout</span>
            </li>
          </ul>
        </div>
        <div className="filters-list">
          <p>Filter by</p>
        </div>
        <Button
          children="add bet"
          type="button"
          className="btn btn-filled button-font-1rem"
          onClick={() => navigate("/add-bet")}
        />
      </div>
      <div className="bets-table">
        <table>
          <HeadersBetsTable />
          <tbody>
            {allbets.map((bet) => (
              <tr
                key={bet.id}
                className={getRowColor(bet.status)}
                onClick={() => modifybet(String(bet.id))}
              >
                <DateBetsTable bet={bet} />
                <SportBetsTable bet={bet} />
                <TypeBetsTable bet={bet} />
                <SelectionBetsTable bet={bet} />
                <ResultBetsTable bet={bet} />
                <StakeBetsTable bet={bet} />
                <OddsBetsTable bet={bet} />
                <BetStatusChange bet={bet} />
                <PayoutBetsTable bet={bet} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
