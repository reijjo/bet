import "./InputErrorContainer.css";

import { CSSProperties } from "react";

import { FieldError, MultipleFieldErrors } from "react-hook-form";

interface InputErrorContainerProps {
  errors: MultipleFieldErrors | FieldError;
  width?: CSSProperties["width"];
  field?: string;
}

export const InputErrorContainer = ({
  errors,
  width = "100%",
  field,
}: InputErrorContainerProps) => {
  return (
    <ul className="input-error-container" style={{ width: width }}>
      {field && <p>{field} must contain:</p>}
      {errors.message ? (
        <li className="input-error-message" role="alert">
          {errors.message}
        </li>
      ) : (
        // Otherwise treat it as MultipleFieldErrors
        Object.entries(errors).map(([key, message]) =>
          message ? (
            <li key={key} className="input-error-message" role="alert">
              {String(message)}
            </li>
          ) : null
        )
      )}
    </ul>
  );
};
