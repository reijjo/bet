import "./BetsSortFilter.css";

import { Dispatch, SetStateAction, useCallback, useState } from "react";

import {
  faCaretDown,
  faCaretUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  FilterOption,
  MINI_FILTER_OPTIONS,
  SORT_DIRECTION_MAP,
  SORT_OPTIONS,
  SortField,
  SortOption,
  converSortOptions,
} from "./betSortFilterUtils";

// SORT
type BetsSortProps = {
  currentSort: SortOption;
  onSortChange: (newSort: SortOption) => void;
};

export const BetsSort = ({ currentSort, onSortChange }: BetsSortProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleSortSelection = (field: SortField, option: string) => {
    const newSort = converSortOptions(field, option);
    onSortChange(newSort);
  };

  return (
    <div
      className="filters-list filters-list-sort"
      onMouseEnter={() => setIsSortOpen(true)}
      onMouseLeave={() => setIsSortOpen(false)}
    >
      <div>
        <p>Sort by</p>
        {isSortOpen ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </div>
      {isSortOpen && (
        <ul className="first-level-dropdown">
          {Object.values(SORT_OPTIONS).map((opt) => (
            <li key={opt.field}>
              <span>{opt.label}</span>
              <ul className="multi-level-dropdown">
                {opt.options.map((option, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleSortSelection(opt.field, option)}
                    >
                      <p>{option}</p>
                      <FontAwesomeIcon
                        icon={faCheck}
                        color={
                          currentSort.field === opt.field &&
                          currentSort.direction === SORT_DIRECTION_MAP[option]
                            ? "white"
                            : "transparent"
                        }
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// FILTER
type BetsFilterProps = {
  activeFilters: FilterOption[];
  setActiveFilters: Dispatch<SetStateAction<FilterOption[]>>;
};
export const BetsFilter = ({
  activeFilters,
  setActiveFilters,
}: BetsFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const isFilterActive = useCallback(
    (field: string, value: string) => {
      return activeFilters.some(
        (filter) => filter.field === field && filter.value === value,
      );
    },
    [activeFilters],
  );

  const handleFilterSelection = (field: string, value: string) => {
    setActiveFilters((prevFilters) => {
      const existingFilterIndex = prevFilters.findIndex(
        (filter) => filter.field === field && filter.value === value,
      );

      if (existingFilterIndex >= 0) {
        return prevFilters.filter((_, index) => index !== existingFilterIndex);
      } else {
        return [
          ...prevFilters,
          { field: field as FilterOption["field"], value },
        ];
      }
    });
  };

  console.log("activeFilters", activeFilters);

  return (
    <div
      className="filters-list filters-list-filter"
      onMouseEnter={() => setIsFilterOpen(true)}
      onMouseLeave={() => setIsFilterOpen(false)}
    >
      <div>
        <p>Filter by</p>
        {isFilterOpen ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </div>
      {isFilterOpen && (
        <ul className="first-level-dropdown">
          {Object.values(MINI_FILTER_OPTIONS).map((fil) => (
            <li key={fil.field}>
              <span>{fil.label}</span>
              <ul className="multi-level-dropdown">
                {fil.options.map((option, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleFilterSelection(fil.field, option)}
                    >
                      <p>{option}</p>
                      <FontAwesomeIcon
                        icon={faCheck}
                        color={
                          isFilterActive(fil.field, option)
                            ? "white"
                            : "transparent"
                        }
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
