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
  alignItems?: string;
  alignSelf?: string;
  padding?: string;
  margin?: string;
};

export const Container = ({
  children,
  width = "100%",
  border = "1px solid",
  borderColor = "var(--primary)",
  borderRadius = "8px",
  backgroundColor = "transparent",
  boxShadow = "var(--shadow-m)",
  display = "flex",
  justifyContent = "space-between",
  alignItems = "center",
  alignSelf,
  padding,
  margin,
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
      alignItems,
      alignSelf,
      padding,
      margin,
    }}
  >
    {children}
  </div>
);
