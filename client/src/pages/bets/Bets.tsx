import "./Bets.css";

import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button, Error, Loading } from "../../components";
import { useGetBetsQuery } from "../../features/api/betsApiSlice";
import { isModifyBetModalOpen } from "../../features/modalSlice";
import { useAppDispatch } from "../../store/hooks";
import { getRowColor } from "../../utils/helperFunctions";
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
  const { data: allBets = [], isLoading, isError, error } = useGetBetsQuery();

  const [currentSort, setCurrentSort] = useState<SortOption>({
    field: "date",
    direction: "asc",
  });
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);

  const sortedAndFiltered = useMemo(() => {
    return sortFilteredBets(allBets, currentSort, activeFilters);
  }, [allBets, currentSort, activeFilters]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const modifybet = (id: number | string) => {
    dispatch(isModifyBetModalOpen({ id, isOpen: true }));
  };

  console.log("allBets", allBets[0]);
  // TODO: Own component wrapper for isLoading ??
  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

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
          height="max-content"
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
                onClick={() => modifybet(Number(bet.id))}
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
