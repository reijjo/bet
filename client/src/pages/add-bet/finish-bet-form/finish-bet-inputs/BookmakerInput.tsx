import "./BookmakerInput.css";

import { Select } from "../../../../components/ui/inputs/Select";
import { Bookmaker } from "../../../../utils/enums";

type BookmakerInputProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: Bookmaker;
  disabled?: boolean;
};
export const BookmakerInput = ({
  onChange,
  value,
  disabled,
}: BookmakerInputProps) => (
  <div className="bookmaker-input">
    <Select
      id="bookmaker"
      name="bookmaker"
      label="Bookmaker"
      className="text-input"
      options={Object.values(Bookmaker)}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  </div>
);
