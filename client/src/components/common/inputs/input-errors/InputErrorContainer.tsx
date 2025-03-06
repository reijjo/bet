import "./InputErrorContainer.css";

import { CSSProperties } from "react";

import { MultipleFieldErrors } from "react-hook-form";

interface InputErrorContainerProps {
  errors: MultipleFieldErrors;
  width?: CSSProperties["width"];
  field?: string;
}

export const InputErrorContainer = ({
  errors,
  width = "75%",
  field,
}: InputErrorContainerProps) => {
  return (
    <ul className="input-error-container" style={{ width: width }}>
      {field && <p>{field} must contain:</p>}
      {Object.entries(errors).map(([key, message]) =>
        message ? (
          <li key={key} className="input-error-message">
            {String(message)}
          </li>
        ) : null,
      )}
    </ul>
  );
};
