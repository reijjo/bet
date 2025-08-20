import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Loading, Message } from "../../../components";
import {
  errorTypeMessage,
  getErrorMessage,
} from "../../../utils/errors/error-helpers";
import { SerializedError } from "@reduxjs/toolkit/react";
import { MessageTypes } from "../../../utils/enums";

interface LoginMessageProps {
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  isFetching: boolean;
  isFetchError: boolean;
  fetchError: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
}

export const LoginMessage = ({
  isError,
  error,
  isFetching,
  isFetchError,
  fetchError,
  isLoading,
}: LoginMessageProps) => (
  <>
    {(isError || isFetchError || isLoading) && (
      <Message
        message={
          isLoading || isFetching ? (
            <Loading
              color="message-info"
              text={isLoading ? "Logging in..." : "Finding user..."}
            />
          ) : (
            getErrorMessage(error || fetchError)
          )
        }
        type={
          isLoading || isFetching ? MessageTypes.Info : errorTypeMessage(error)
        }
        width="75%"
      />
    )}
  </>
);
