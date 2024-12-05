import { InputHTMLAttributes, SyntheticEvent } from "react";

interface TextInputWithButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
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
}

export const TextInputWithButton = ({
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
  ...props
}: TextInputWithButtonProps) => {
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
    </div>
  );
};
