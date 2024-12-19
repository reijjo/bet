import "./SelectedSortFilter.css";

import { Dispatch, SetStateAction, useCallback } from "react";

import {
  faArrowDown,
  faArrowUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useScreenWidth } from "../../hooks/useScreenWidth";
import {
  FilterOption,
  SortOption,
  getSortDisplayText,
} from "./betSortFilterUtils";

// SORT
type SelectedSortProps = {
  currentSort: SortOption;
  setCurrentSort: Dispatch<SetStateAction<SortOption>>;
};

export const SelectedSort = ({
  currentSort,
  setCurrentSort,
}: SelectedSortProps) => {
  const { fieldLabel, directionLabel } = getSortDisplayText(currentSort);
  const { isMobile } = useScreenWidth();

  // Gets correct sort icon
  const getSortIcon = (directionLabel: string) => {
    return directionLabel === "High to Low" || directionLabel === "Latest"
      ? faArrowUp
      : faArrowDown;
  };

  // Clear the sort to default
  const clearSort = () => {
    setCurrentSort({ field: "date", direction: "desc" });
  };

  return (
    <div className="bets-filters-selected-sort">
      <div className="filter-info">
        <div className="filter-field">
          <b>Sort:</b> <p>{fieldLabel} </p>
        </div>
        <p className="filter-value">
          {isMobile ? (
            <FontAwesomeIcon icon={getSortIcon(directionLabel)} />
          ) : (
            <>- {directionLabel}</>
          )}
        </p>
      </div>
      <button onClick={clearSort}>
        {!(
          currentSort.field === "date" && currentSort.direction === "desc"
        ) && <FontAwesomeIcon icon={faXmark} />}
      </button>
    </div>
  );
};

// FILTER
type SelectedFiltersProps = {
  activeFilters: FilterOption[];
  setActiveFilters: Dispatch<SetStateAction<FilterOption[]>>;
};

export const SelectedFilters = ({
  activeFilters,
  setActiveFilters,
}: SelectedFiltersProps) => {
  const { isMobile } = useScreenWidth();
  const removeFilter = useCallback(
    (filterToRemove: FilterOption) => {
      setActiveFilters((prevFilters) =>
        prevFilters.filter(
          (filter) =>
            !(
              filter.field === filterToRemove.field &&
              filter.value === filterToRemove.value
            ),
        ),
      );
    },
    [setActiveFilters],
  );

  return (
    <div className="active-filters">
      {activeFilters.map((filter, index) => (
        <div className="bets-filters-selected-filter" key={index}>
          <div className="filter-info">
            <div className="filter-field">
              <b>Filter:</b>{" "}
              <p style={isMobile ? { display: "none" } : {}}>
                {filter.field} -
              </p>
            </div>
            <p className="filter-value">{filter.value}</p>
          </div>
          <button onClick={() => removeFilter(filter)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      ))}
    </div>
  );
};
