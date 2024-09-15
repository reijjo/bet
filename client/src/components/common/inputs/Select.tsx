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
}: SelectProps) => {
  const bookmakers = ["EpicBet", "Bet365", "Unibet", "Veikkaus", "Other"];

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
      >
        {bookmakers.map((bookmaker, index) => (
          <option key={index} value={bookmaker}>
            {bookmaker}
          </option>
        ))}
      </select>
    </div>
  );
};
