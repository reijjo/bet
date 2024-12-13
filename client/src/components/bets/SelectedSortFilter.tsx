import "./SelectedSortFilter.css";

import { Dispatch, SetStateAction } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FilterOption, SortOption } from "./betSortFilterUtils";
import { getSortDisplayText } from "./betSortFilterUtils";

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
  const clearSort = () => {
    setCurrentSort({ field: "date", direction: "desc" });
  };

  return (
    <div className="bets-filters-selected-sort">
      {/* <div>
        <b>Sort:</b> {getSortDisplayText(currentSort)}
      </div>
      <button onClick={clearSort}>
        {!(
          currentSort.field === "date" && currentSort.direction === "desc"
        ) && <FontAwesomeIcon icon={faXmark} />}
      </button> */}
      <div className="filter-info">
        <div className="filter-field">
          <b>Sort:</b> <p>{fieldLabel} </p>
        </div>
        <p className="filter-value"> - {directionLabel}</p>
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
          <div className="filter-info">
            <div className="filter-field">
              <b>Filter:</b> <p>{filter.field} </p>
            </div>
            <p className="filter-value"> - {filter.value}</p>
          </div>
          <button onClick={() => removeFilter(filter)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      ))}
    </div>
  );
};
