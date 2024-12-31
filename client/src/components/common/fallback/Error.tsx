import "./Error.css";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";

import { Button } from "../button/Button";

type ErrorProps = {
  error: FetchBaseQueryError | SerializedError;
};

export const Error = ({ error }: ErrorProps) => {
  const navigate = useNavigate();
  console.log("error", error);

  const getErrorMessage = () => {
    if ("status" in error) {
      // Handle FetchBaseQueryError
      const fetchError = error as FetchBaseQueryError;
      if (fetchError.status === "PARSING_ERROR") {
        return `Error ${fetchError.originalStatus}: ${fetchError.data || "Unknown error occurred"}`;
      } else {
        return `Error: ${fetchError.status}`;
      }
    } else {
      // Handle SerializedError
      return error.message || "An unexpected error occurred";
    }
  };

  return (
    <div className="error-component">
      <h2>Something shady happened</h2>
      <p>{getErrorMessage()}</p>

      <Button
        className="btn btn-outline error-component-button"
        onClick={() => navigate("/")}
        type="button"
        width="max-content"
        margin="1rem 0 0"
      >
        <p>Back to Homepage</p>
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
  );
};
