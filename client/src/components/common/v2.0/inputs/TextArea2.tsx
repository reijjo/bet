import { TextareaHTMLAttributes } from "react";
import "./TextArea2.css";

interface TextArea2Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  inputError?: string;
}

export const TextArea2 = ({
  id,
  label,
  inputError,
  ...rest
}: TextArea2Props) => {
  return (
    <div className="text-area-container">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className={inputError ? "input-error-border" : ""}
        {...rest}
      ></textarea>
      {inputError && (
        <div className="input-error">
          <p className="input-error-message">{inputError}</p>
        </div>
      )}
    </div>
  );
};
