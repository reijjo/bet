import { useLazyGetSessionUserQuery } from "../features/api/authApi";
import { loginUser, logoutUser } from "../features/authSlice";
import { AppDispatch } from "../store/store";
import { BasicApiResponse } from "./api-response-types";
import { MessageType, MessageTypes } from "./enums";
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

export const errorTypeMessage = (error: unknown): MessageType => {
  const errorType = getErrorStatus(error);
  if (errorType === 403) {
    return MessageTypes.Warning;
  }
  return MessageTypes.Error;
};

export const handleLogout = async (
  logout: () => Promise<BasicApiResponse>,
  dispatch: AppDispatch
) => {
  try {
    await logout();
  } catch (error) {
    console.log("Error logging out", error);
  }
  dispatch(logoutUser());
};

// utils/authUtils.ts
export const verifySession = async (
  fetchSession: ReturnType<typeof useLazyGetSessionUserQuery>[0],
  dispatch: AppDispatch
) => {
  try {
    const result = await fetchSession().unwrap();
    if (result?.success && result?.data) {
      dispatch(loginUser(result.data));
    } else {
      dispatch(logoutUser());
    }
  } catch (err) {
    console.error("Session check error:", err);
    dispatch(logoutUser());
  }
};
