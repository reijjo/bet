import { ErrorWithData } from "./types";

export const isErrorWithData = (error: unknown): error is ErrorWithData => {
  return typeof error === "object" && error !== null && "data" in error;
};
