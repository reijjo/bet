import "./TextInput2.css";
import { InputHTMLAttributes } from "react";

interface TextInput2Props extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  value?: string;
  label?: string;
  id: string;
  optional?: boolean;
  inputError?: string;
}

export const TextInput2 = ({
  type = "text",
  id,
  value,
  label,
  optional = false,
  inputError,
  ...rest
}: TextInput2Props) => {
  return (
    <div className="text-input-container">
      {label && (
        <div className="label-row">
          <label htmlFor={id}>{label}</label>
          {optional && <span className="optional">(optional)</span>}
        </div>
      )}
      <input
        type={type}
        value={value}
        autoComplete="off"
        className={inputError ? "input-error-border" : ""}
        {...rest}
      />
      {inputError && (
        <div className="input-error">
          <p className="input-error-message">{inputError}</p>
        </div>
      )}
    </div>
  );
};
