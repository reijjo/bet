import "./Select.css";

import { InputHTMLAttributes } from "react";

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  className?: string;
  label?: string;
  optional?: string;
  id: string;
  name: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  height?: string;
  width?: string;
  backgroundColor?: string;
}

export const Select = ({
  className,
  label,
  optional,
  id,
  name,
  options,
  onChange,
  value,
  width = "100%",
  height = "2.5rem",
  backgroundColor = "white",
  ...props
}: SelectProps) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id}>
          {label}{" "}
          {optional && <p className="text-input-paragraph">({optional})</p>}
        </label>
      )}
      <select
        {...props}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        style={{
          height: height,
          width: width,
          backgroundColor: backgroundColor,
        }}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
