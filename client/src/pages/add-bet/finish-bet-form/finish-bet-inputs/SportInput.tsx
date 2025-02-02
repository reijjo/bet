import "./SportInput.css";

import { Select } from "../../../../components";
import { SportLeague } from "../../../../utils/enums";

type SportInputProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  disabled?: boolean;
};
export const SportInput = ({ value, disabled, onChange }: SportInputProps) => {
  console.log("value", value);
  return (
    <div className="sport-input" data-testid="sport-input">
      <Select
        className="text-input"
        label="Sport / League"
        type="text"
        name="sport"
        id="sport"
        options={Object.values(SportLeague)}
        onChange={(e) => onChange(e)}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};
