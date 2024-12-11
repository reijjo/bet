import "./SportInput.css";

import { SportLeague } from "../../../../utils/enums";
import { Select } from "../../../common/inputs/Select";

type SportInputProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  disabled?: boolean;
};
export const SportInput = ({ onChange, value, disabled }: SportInputProps) => (
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
