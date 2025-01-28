import { BetStatus, BetType, Bookmaker, SportLeague } from "../../utils/enums";
import { Bet } from "../../utils/types";
import {
  calculateTotalLosses,
  calculateTotalPayout,
} from "../dashboard/dashboard-cards/summaryUtils";

// Types for sorting / filtering
export type SortField = "date" | "stake" | "odds" | "payout";
export type SortDirection = "asc" | "desc";

export type SortOption = {
  field: SortField;
  direction: SortDirection;
};

export type FilterField =
  | "stake"
  | "bookmaker"
  | "tipper"
  | "status"
  | "type"
  | "sport"
  | "date"
  | "team"
  | "odds"
  | "freebet"
  | "livebet"
  | "status";
export type FilterValue = string | number | boolean;

export type FilterOption = {
  field: FilterField;
  value: FilterValue;
};

// Constants
export const SORT_OPTIONS = {
  DATE: {
    field: "date" as SortField,
    label: "Date",
    options: ["Latest", "Oldest"],
  },
  STAKE: {
    field: "stake" as SortField,
    label: "Stake",
    options: ["Low to High", "High to Low"],
  },
  ODDS: {
    field: "odds" as SortField,
    label: "Odds",
    options: ["Low to High", "High to Low"],
  },
  PAYOUT: {
    field: "payout" as SortField,
    label: "Payout",
    options: ["Low to High", "High to Low"],
  },
} as const;

export const SORT_DIRECTION_MAP: Record<string, SortDirection> = {
  Latest: "desc",
  Oldest: "asc",
  "Low to High": "asc",
  "High to Low": "desc",
};

export const MINI_FILTER_OPTIONS = {
  SPORT: {
    field: "sport" as FilterField,
    label: "Sport",
    options: Object.values(SportLeague),
  },
  TYPE: {
    field: "type" as FilterField,
    label: "Type",
    options: Object.values(BetType),
  },
  STATUS: {
    field: "status" as FilterField,
    label: "Bet Status",
    options: Object.values(BetStatus),
  },
  BOOKMAKER: {
    field: "bookmaker" as FilterField,
    label: "Bookmaker",
    options: Object.values(Bookmaker),
  },
} as const;

// Helper functions
const getOdds = (bet: Bet): number => {
  return parseFloat(
    bet.betDetails
      .reduce((acc, detail) => acc * Number(detail.odds), 1)
      .toFixed(2),
  );
};

const getSortValue = (bet: Bet, field: SortField): number => {
  switch (field) {
    case "date":
      return new Date(bet.betDetails[0].date).getTime();
    case "stake":
      return Number(bet.stake);
    case "odds":
      return getOdds(bet);
    case "payout": {
      const total = calculateTotalPayout([bet]) - calculateTotalLosses([bet]);
      return total;
    }
    default:
      return 0;
  }
};

const applyFilters = (bet: Bet, filters: FilterOption[]): boolean => {
  // Group filters by field
  const filtersByField = filters.reduce(
    (acc, filter) => {
      if (!acc[filter.field]) {
        acc[filter.field] = [];
      }
      acc[filter.field].push(filter.value);
      return acc;
    },
    {} as Record<string, FilterValue[]>,
  );

  // Check each field's filters
  return Object.entries(filtersByField).every(([field, values]) => {
    switch (field) {
      case "sport":
        return values.includes(bet.sport);
      case "type":
        return values.includes(bet.bet_final_type);
      case "status":
        return values.includes(bet.status);
      case "bookmaker":
        return values.includes(bet.bookmaker);
      default:
        return true;
    }
  });
};

export const SORT_DISPLAY_LABELS: Record<SortField, string> = {
  date: "Date",
  stake: "Stake",
  odds: "Odds",
  payout: "Payout",
};

export const getSortDisplayText = (
  sortOption: SortOption,
): { fieldLabel: string; directionLabel: string } => {
  const fieldLabel = SORT_DISPLAY_LABELS[sortOption.field];
  let directionLabel =
    sortOption.direction === "desc" ? "High to Low" : "Low to High";
  const dateLabel = sortOption.direction === "desc" ? "Latest" : "Oldest";
  // Special case for date
  if (sortOption.field === "date") {
    directionLabel = dateLabel;
  }

  return { fieldLabel, directionLabel };
};

// Main functions
export const sortFilteredBets = (
  bets: Bet[],
  sortOption?: SortOption,
  filterOptions: FilterOption[] = [],
): Bet[] => {
  // First filters
  const filteredBets =
    filterOptions.length > 0
      ? bets.filter((bet) => applyFilters(bet, filterOptions))
      : [...bets];

  // Then sort
  if (sortOption) {
    filteredBets.sort((a, b) => {
      const multiplier = sortOption.direction === "asc" ? 1 : -1;
      const aValue = getSortValue(a, sortOption.field);
      const bValue = getSortValue(b, sortOption.field);
      return multiplier * (aValue - bValue);
    });
  }
  return filteredBets;
};

// Takes an option and converts it to a sort option
export const converSortOptions = (
  field: SortField,
  option: string,
): SortOption => {
  return {
    field,
    direction: SORT_DIRECTION_MAP[option] ?? "asc",
  };
};
