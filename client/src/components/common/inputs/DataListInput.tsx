import { InputHTMLAttributes, SyntheticEvent } from "react";

import { Sport } from "../../../utils/types";

interface DataListInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showLabel?: boolean;
  optional?: string;
  className?: string;
  name: string;
  id: string;
  buttonText: string;
  onClick: (e: SyntheticEvent) => void;
  height?: string;
  width?: string;
  backgroundColor?: string;
  errorStyle?: boolean;
  options: Sport[];
}

export const DataListInput = ({
  label,
  showLabel = true,
  optional,
  className,
  name,
  id,
  buttonText,
  onClick,
  width = "100%",
  height = "2.5rem",
  backgroundColor = "white",
  errorStyle,
  options,
  ...props
}: DataListInputProps) => {
  return (
    <div className={className}>
      {showLabel && (
        <label htmlFor={id}>
          {label}{" "}
          {optional && <p className="text-input-paragraph">({optional})</p>}
        </label>
      )}
      <div className="input-button-wrapper">
        <input
          name={name}
          id={id}
          list={name}
          className={`${errorStyle && "input-error"}`}
          {...props}
          style={{
            height: height,
            width: width,
            backgroundColor: backgroundColor,
          }}
        />
        <button className="btn btn-primary-color" onClick={onClick}>
          {buttonText}
        </button>
      </div>
      <datalist id={name}>
        {options.map((op) => (
          <option key={op.id} value={op.name} />
        ))}
      </datalist>
    </div>
  );
};
