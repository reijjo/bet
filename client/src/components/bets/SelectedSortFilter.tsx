import "./SelectedSortFilter.css";

import { Dispatch, SetStateAction } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const clearSort = () => {
    setCurrentSort({ field: "date", direction: "desc" });
  };

  return (
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
  const removeFilter = (filterToRemove: FilterOption) => {
    setActiveFilters((prevFilters) =>
      prevFilters.filter(
        (filter) =>
          !(
            filter.field === filterToRemove.field &&
            filter.value === filterToRemove.value
          ),
      ),
    );
  };

  return (
    <div className="active-filters">
      {activeFilters.map((filter, index) => (
        <div className="bets-filters-selected-filter" key={index}>
          <p>
            <b>Filter:</b> <span>{filter.field}</span> - {filter.value}
          </p>
          <button onClick={() => removeFilter(filter)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      ))}
    </div>
  );
};
