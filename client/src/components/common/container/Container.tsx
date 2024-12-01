import "./Container.css";

import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  width?: string;
  border?: string;
  borderColor?: string;
  borderRadius?: string;
  backgroundColor?: string;
  boxShadow?: string;
  display?: string;
  justifyContent?: string;
};

export const Container = ({
  children,
  width = "100%",
  border = "1px solid",
  borderColor = "var(--primary)",
  borderRadius = "8px",
  backgroundColor = "transparent",
  boxShadow = "var(--shadow-m)",
  display,
  justifyContent,
}: ContainerProps) => (
  <div
    className="container-base-styles"
    style={{
      width,
      border,
      borderColor,
      borderRadius,
      backgroundColor,
      boxShadow,
      display,
      justifyContent,
    }}
  >
    {children}
  </div>
);
