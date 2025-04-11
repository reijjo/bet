import "./Bets.css";

import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button, Error, Loading } from "../../components";
import { useGetBetsQuery } from "../../features/api/betsApiSlice";
import { logoutUser } from "../../features/authSlice";
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
  const {
    data: allBets = [],
    isLoading,
    isError,
    error,
  } = useGetBetsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [visibleCount, setVisibleCount] = useState(10);

  const [currentSort, setCurrentSort] = useState<SortOption>({
    field: "date",
    direction: "desc",
  });
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);

  const sortedAndFiltered = useMemo(() => {
    return sortFilteredBets(allBets, currentSort, activeFilters);
  }, [allBets, currentSort, activeFilters]);

  const visibleBets = useMemo(() => {
    return sortedAndFiltered.slice(0, visibleCount);
  }, [sortedAndFiltered, visibleCount]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Handle authentication errors in an effect instead of during render
  useEffect(() => {
    if (isError && !isLoading) {
      dispatch(logoutUser());
    }
  }, [isError, isLoading, dispatch]);

  const modifybet = (id: number | string) => {
    dispatch(isModifyBetModalOpen({ id, isOpen: true }));
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

  return (
    <div className="bets-page">
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
              {visibleBets.map((bet) => (
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
        <div className="show-more-wrapper">
          <div className="show-more-buttons">
            <Button
              type="button"
              className="btn btn-outline"
              children="Show 10 more"
              width="min(20rem, 100%)"
              onClick={() => setVisibleCount((prev) => prev + 10)}
            />
            <Button
              type="button"
              className="btn btn-special"
              children="Show all"
              width="min(20rem, 100%)"
              onClick={() => setVisibleCount(sortedAndFiltered.length)}
            />
          </div>
          <p>
            Showing{" "}
            {visibleCount >= sortedAndFiltered.length
              ? sortedAndFiltered.length
              : visibleCount}{" "}
            / {sortedAndFiltered.length} bets
          </p>
        </div>
      </div>
    </div>
  );
};
