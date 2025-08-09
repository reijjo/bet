import { TextareaHTMLAttributes } from "react";
import "./TextArea2.css";
import { charCounterValidator } from "./utils/helperFunctions";

interface TextArea2Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  inputError?: string;
  maxLength?: number;
  minLength?: number;
}

export const TextArea2 = ({
  id,
  label,
  inputError,
  maxLength = 1000,
  minLength = 5,
  ...rest
}: TextArea2Props) => {
  const textValue = (rest.value as string) || "";
  const isValidLength = charCounterValidator(textValue, minLength, maxLength);

  return (
    <div className="text-area-container">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className={inputError ? "input-error-border" : ""}
        {...rest}
      ></textarea>
      <div className="char-counter">
        <p
          className={
            !isValidLength && textValue.length !== 0 ? "char-counter-error" : ""
          }
        >
          {textValue.length} / {maxLength}
        </p>
      </div>
      {inputError && (
        <div className="input-error">
          <p className="input-error-message">{inputError}</p>
        </div>
      )}
    </div>
  );
};
