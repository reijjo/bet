import { ChangeEvent } from "react";
import "./TextInput.css";

type TextInputProps = {
  className?: string;
  type: string;
  placeholder?: string;
  id: string;
  name: string;
  size?: number;
  label?: string;
  optional?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
};

export const TextInput = ({
  className,
  label,
  optional,
  type,
  placeholder,
  id,
  name,
  size,
  onChange,
  defaultValue,
}: TextInputProps) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name}>
          {label}{" "}
          {optional && <p className="text-input-paragraph">({optional})</p>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        size={size}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
};
