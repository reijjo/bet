import "./TextInput2.css";
import { InputHTMLAttributes } from "react";

interface TextInput2Props extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  value?: string;
  label?: string;
  id: string;
  optional?: boolean;
}

export const TextInput2 = ({
  type = "text",
  id,
  value,
  label,
  optional = false,
  ...rest
}: TextInput2Props) => {
  return (
    <div className="text-input-container">
      {label && (
        <div className="label-row">
          <label htmlFor={id}>{label}</label>
          {optional && <span className="optional">(optional)</span>}
        </div>
      )}
      <input type={type} value={value} id={id} {...rest} />
    </div>
  );
};
