import "./NotesInput.css";

import { TextInput } from "../../../common/inputs/TextInput";

type NotesInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disabled?: boolean;
};
export const NotesInput = ({ onChange, value, disabled }: NotesInputProps) => (
  <div className="notes-input">
    <TextInput
      className="text-input"
      label="Notes"
      type="text"
      placeholder="Notes for the bet..."
      name="notes"
      id="notes"
      optional="optional"
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  </div>
);
