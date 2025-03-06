import { isErrorWithData } from "./input-validators/typeGuards";
import { ApiErrorResponse } from "./types";

export const scrollToTop = () => {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 100);
};

export const scrollDown = () => {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, 100);
};

// Gets the row color in bets table
export const getRowColor = (status: string) => {
  switch (status) {
    case "Won":
      return "bet-won";
    case "Half Won":
      return "bet-won";
    case "Lost":
      return "bet-lost";
    case "Half Lost":
      return "bet-lost";
    case "Void":
      return "bet-void";
    case "Pending":
      return "bet-pending";
    default:
      return "";
  }
};

export const apiErrorWrapper = (error: unknown) => {
  return error as { data: ApiErrorResponse };
};

export const getErrorMessage = (error: unknown): string => {
  if (isErrorWithData(error) && error.data?.message) {
    return error.data.message;
  }
  return "An unexpected error occurred";
};

export const getErrorStatus = (error: unknown): number => {
  if (isErrorWithData(error) && error.data?.status) {
    return error.data.status;
  }
  return 500;
};
