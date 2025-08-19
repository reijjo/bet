import { MessageType, MessageTypes } from "../enums";
import { isErrorWithData } from "../input-validators/typeGuards";

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
