import "./TextInput.css";

import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showLabel?: boolean;
  optional?: string;
  className?: string;
  name: string;
  id: string;
  height?: string;
  width?: string;
  backgroundColor?: string;
}

export const TextInput = ({
  label,
  showLabel = true,
  optional,
  className,
  name,
  id,
  width = "100%",
  height = "2.5rem",
  backgroundColor = "white",
  ...props
}: TextInputProps) => {
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
        {...props}
        style={{
          height: height,
          width: width,
          backgroundColor: backgroundColor,
        }}
      />
    </div>
  );
};
