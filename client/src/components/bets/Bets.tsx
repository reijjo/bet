import "./Bets.css";

import { useEffect } from "react";

import { initAllBets } from "../../reducers/betReducer";
import { openModifyBet } from "../../reducers/modalReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
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

  useEffect(() => {
    dispatch(initAllBets());
  }, [dispatch]);

  const getRowColor = (status: string) => {
    switch (status) {
      case "Won":
        return "bet-won";
      case "Half Won":
        return "bet-won";
      case "Lost":
        return "bet-lost";
      case "Half Lost":
        return "bet-lost";
      case "Void":
        return "bet-void";
      case "Pending":
        return "bet-pending";
      default:
        return "";
    }
  };

  const modifybet = (id: number | string) => {
    dispatch(openModifyBet(id));
  };

  return (
    <div className="wrapper">
      <h1>Bets</h1>
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
