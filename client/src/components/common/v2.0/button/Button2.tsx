import "./Button2.css";
import { ButtonHTMLAttributes } from "react";

interface Button2Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button2 = ({
  type = "button",
  className,
  ...rest
}: Button2Props) => {
  return (
    <button type={type} {...rest} className={className}>
      {rest.children}
    </button>
  );
};
