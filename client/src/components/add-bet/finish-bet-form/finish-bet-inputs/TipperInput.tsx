import "./TipperInput.css";

import { TextInput } from "../../../common/inputs/TextInput";

type TipperInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disabled?: boolean;
};
export const TipperInput = ({
  onChange,
  value,
  disabled,
}: TipperInputProps) => (
  <div className="tipper-input">
    <TextInput
      className="text-input"
      label="Tipper"
      type="text"
      placeholder="e.g. LeftFoot"
      name="tipper"
      id="tipper"
      optional="optional"
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  </div>
);
