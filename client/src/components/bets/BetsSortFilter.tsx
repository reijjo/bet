import "./BetsSortFilter.css";

import { useState } from "react";

import {
  faCaretDown,
  faCaretUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Bet } from "../../utils/types";

type BetsSortProps = {
  bets: Bet[];
};

export const BetsSort = ({ bets }: BetsSortProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortOptions = [
    { field: "date", label: "Date", options: ["Latest", "Oldest"] },
    { field: "stake", label: "Stake", options: ["Low to High", "High to Low"] },
    { field: "odds", label: "Odds", options: ["Low to High", "High to Low"] },
    {
      field: "payout",
      label: "Payout",
      options: ["Low to High", "High to Low"],
    },
  ];

  console.log("bents", bets);

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
          {sortOptions.map((opt) => (
            <li key={opt.field}>
              <span>{opt.label}</span>
              <ul className="multi-level-dropdown">
                {opt.options.map((option, index) => (
                  <li key={index}>
                    <button>
                      <p>{option}</p>
                      <FontAwesomeIcon icon={faCheck} color="transparent" />
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
