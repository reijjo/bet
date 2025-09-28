import "./TextInput.css";

import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useState,
} from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showLabel?: boolean;
  optional?: string | ReactNode;
  className?: string;
  name: string;
  id: string;
  height?: string;
  width?: string;
  backgroundColor?: string;
  errorStyle?: boolean;
  isPassword?: boolean;
  type?: HTMLInputTypeAttribute;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      showLabel = true,
      optional,
      className,
      name,
      id,
      errorStyle,
      width = "100%",
      height = "2.5rem",
      backgroundColor = "white",
      isPassword = false,
      handleBlur,
      handleFocus,
      type = "text",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className={className}>
        {showLabel && (
          <label htmlFor={id}>
            {label}{" "}
            {optional && <p className="text-input-paragraph">({optional})</p>}
          </label>
        )}
        <div className="input-container">
          <input
            name={name}
            id={id}
            onBlur={handleBlur}
            onFocus={handleFocus}
            {...props}
            className={`${errorStyle && "input-error"}`}
            autoComplete="off"
            type={inputType}
            style={{
              height: height,
              width: width,
              backgroundColor: backgroundColor,
            }}
            ref={ref}
          />
          {isPassword && (
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          )}
        </div>
      </div>
    );
  }
);
