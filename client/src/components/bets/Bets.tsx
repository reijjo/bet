import "./Bets.css";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { initAllBets } from "../../reducers/betReducer";
import { openModifyBet } from "../../reducers/modalReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getRowColor } from "../../utils/helperFunctions";
import { Button } from "../common/Button";
import { BetsFilter, BetsSort } from "./BetsSortFilter";
import { SelectedFilters, SelectedSort } from "./SelectedSortFilter";
import {
  FilterOption,
  SortOption,
  sortFilteredBets,
} from "./betSortFilterUtils";
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
  const [currentSort, setCurrentSort] = useState<SortOption>({
    field: "date",
    direction: "desc",
  });
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);

  const sortedAndFiltered = sortFilteredBets(
    allbets,
    currentSort,
    activeFilters,
  );

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
        <BetsSort currentSort={currentSort} onSortChange={setCurrentSort} />
        <BetsFilter
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
        <Button
          children="add bet"
          type="button"
          className="btn btn-filled"
          onClick={() => navigate("/add-bet")}
          width="max-content"
          margin="0 0 0 auto"
        />
        <SelectedSort
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
        />
        <SelectedFilters
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      </div>
      <div className="bets-table">
        <table>
          <HeadersBetsTable />
          <tbody>
            {sortedAndFiltered.map((bet) => (
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
