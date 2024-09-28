import { ChangeEvent } from "react";
import "./TextArea.css";

type TextAreaProps = {
  className?: string;
  label?: string;
  optional?: string;
  id: string;
  name: string;
  rows?: number;
  cols?: number;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
};

export const TextArea = ({
  className,
  label,
  optional,
  id,
  name,
  rows,
  cols,
  onChange,
  defaultValue,
  placeholder,
  value,
  disabled,
}: TextAreaProps) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name}>
          {label}{" "}
          {optional && <p className="text-input-paragraph">({optional})</p>}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        rows={rows}
        cols={cols}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};
