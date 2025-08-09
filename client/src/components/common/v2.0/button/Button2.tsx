import "./Button2.css";
import { ButtonHTMLAttributes } from "react";

interface Button2Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  className?: string;
  height?: string;
}

export const Button2 = ({
  type = "button",
  className,
  height,
  ...rest
}: Button2Props) => {
  return (
    <button type={type} {...rest} className={className} style={{ height }}>
      {rest.children}
    </button>
  );
};
