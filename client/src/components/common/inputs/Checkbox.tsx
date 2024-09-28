import { ChangeEvent } from "react";
import "./Checkbox.css";

type CheckboxProps = {
  className?: string;
  label?: string;
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
  disabled?: boolean;
};

export const Checkbox = ({
  className,
  label,
  id,
  name,
  checked,
  onChange,
  value,
  disabled,
}: CheckboxProps) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        value={value.toString()}
        disabled={disabled}
      />
    </div>
  );
};
