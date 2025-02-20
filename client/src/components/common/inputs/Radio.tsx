import "./Radio.css";

import { InputHTMLAttributes } from "react";

import { RadioOptions } from "./radio-input-options/gender";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  width?: string;
  height?: string;
  options: RadioOptions[];
}

export const Radio = ({
  className,
  name,
  width = "75%",
  height,
  options,
}: RadioProps) => {
  return (
    <>
      <p className="radio-input-label">Gender</p>
      <div className={`radio-group ${className} `} style={{ width: width }}>
        {options.map((option) => (
          <div key={option.value} className="radio">
            <input
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              height={height}
              defaultChecked={options[0].value === option.value}
            />
            <label htmlFor={option.value} className="radio-label">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
