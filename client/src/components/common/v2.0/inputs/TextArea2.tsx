import { TextareaHTMLAttributes } from "react";
import "./TextArea2.css";

interface TextArea2Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
}

export const TextArea2 = ({ id, label, ...rest }: TextArea2Props) => {
  return (
    <div className="text-area-container">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...rest}></textarea>
    </div>
  );
};
