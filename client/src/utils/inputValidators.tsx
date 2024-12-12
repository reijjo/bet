import { BetDetails } from "./types";

export const hasLength = (value: string) => {
  return value?.trim().length > 0;
};

export const isNumber = (value: string) => {
  return !isNaN(Number(value));
};

export const hasInputError = (errorText: string) => {
  const ulStyle = {
    padding: "0.5rem 0.75rem",
    listStylePosition: "inside" as const,
    color: "var(--error-dark)",
    backgroundColor: "var(--error-xlight)",
    border: "1px solid var(--error-dark)",
    borderRadius: "8px",
    fontSize: "var(--font-smaller)",
    maxWidth: "max-content",
    marginTop: "0.5rem",
  };

  const liStyle = {
    // transform: "translateX(-4px)",
    listStyle: "none",
  };

  return (
    <ul style={ulStyle}>
      <li style={liStyle}>{errorText}</li>
    </ul>
  );
};

// Bet input validations
export const validateBetDetailsInputs = (details: BetDetails) => {
  const errors: { [key: string]: string } = {};

  // Check selection
  if (!hasLength(details.selection)) {
    errors.selection = "Selection is required";
  }

  // Check odds
  if (!hasLength(String(details.odds))) {
    errors.odds = "Odds is required";
  }

  if (!isNumber(String(details.odds))) {
    errors.odds = "Odds must be a number";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
