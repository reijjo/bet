import "./TextInput.css";

import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

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
      handleBlur,
      handleFocus,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={className}>
        {showLabel && (
          <label htmlFor={id}>
            {label}{" "}
            {optional && <p className="text-input-paragraph">({optional})</p>}
          </label>
        )}
        <input
          name={name}
          id={id}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...props}
          className={`${errorStyle && "input-error"}`}
          style={{
            height: height,
            width: width,
            backgroundColor: backgroundColor,
          }}
          ref={ref}
        />
      </div>
    );
  },
);
