import "./SportInput.css";

import { Select } from "../../../../components";
import { SportLeague } from "../../../../utils/enums";

type SportInputProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  disabled?: boolean;
};
export const SportInput = ({ value, disabled, onChange }: SportInputProps) => {
  return (
    <div className="sport-input">
      <Select
        className="text-input"
        label="Sport / League"
        type="text"
        name="sport"
        id="sport"
        options={Object.values(SportLeague)}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};
