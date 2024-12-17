import "./Bets.css";

import { useEffect, useState } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { initAllBets } from "../../reducers/betReducer";
import { openModifyBet } from "../../reducers/modalReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getRowColor } from "../../utils/helperFunctions";
import { Button } from "../common/Button";
import { BetsFilter, BetsSort } from "./BetsSortFilter";
import {
  FilterOption,
  SortOption,
  getSortDisplayText,
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
    setActiveFilters([]); //REMOVE THIS
  }, [dispatch]);

  const modifybet = (id: number | string) => {
    dispatch(openModifyBet(id));
  };

  const clearSort = () => {
    setCurrentSort({ field: "date", direction: "desc" });
  };

  return (
    <div className="wrapper">
      <h1>Bets</h1>
      <div className="bets-filters">
        <BetsSort currentSort={currentSort} onSortChange={setCurrentSort} />
        <BetsFilter />
        <Button
          children="add bet"
          type="button"
          className="btn btn-filled button-font-1rem"
          onClick={() => navigate("/add-bet")}
          width="max-content"
          margin="0 0 0 auto"
        />
        <div className="bets-filters-selected-sort">
          <p>
            <b>Sort:</b> {getSortDisplayText(currentSort)}
          </p>
          <button onClick={clearSort}>
            {!(
              currentSort.field === "date" && currentSort.direction === "desc"
            ) && <FontAwesomeIcon icon={faXmark} />}
          </button>
        </div>
        {/* )} */}
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
