import "./BetsSortFilter.css";

import { useState } from "react";

import {
  faCaretDown,
  faCaretUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  SORT_DIRECTION_MAP,
  SORT_OPTIONS,
  SortField,
  SortOption,
  converSortOptions,
} from "./betSortFilterUtils";

type BetsSortProps = {
  currentSort: SortOption;
  onSortChange: (newSort: SortOption) => void;
};

export const BetsSort = ({ currentSort, onSortChange }: BetsSortProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSortSelection = (field: SortField, option: string) => {
    const newSort = converSortOptions(field, option);
    onSortChange(newSort);
  };

  return (
    <div
      className="filters-list filters-list-sort"
      onMouseEnter={() => setIsFilterOpen(true)}
      onMouseLeave={() => setIsFilterOpen(false)}
    >
      <div>
        <p>Sort by</p>
        {isFilterOpen ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </div>
      {isFilterOpen && (
        <ul className="first-level-dropdown">
          {/* {sortOptions.map((opt) => ( */}
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

export const BetsFilter = () => {
  return (
    <div className="filters-list filters-list-filter">
      <div>
        <p>Filter by</p>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
    </div>
  );
};
