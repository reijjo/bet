import { ChangeEvent } from "react";
import "./Select.css";

type SelectProps = {
  className?: string;
  label?: string;
  optional?: string;
  id: string;
  name: string;
  size?: number;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
  options: string[];
  value?: string;
  disabled?: boolean;
};

export const Select = ({
  className,
  label,
  optional,
  id,
  name,
  size,
  onChange,
  defaultValue,
  options,
  value,
  disabled,
}: SelectProps) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name}>
          {label}{" "}
          {optional && <p className="text-input-paragraph">({optional})</p>}
        </label>
      )}
      <select
        id={id}
        name={name}
        size={size}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
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
