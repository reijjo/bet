import "./Container.css";

import { CSSProperties, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  width?: string;
  height?: string;
  border?: string;
  borderColor?: string;
  borderRadius?: string;
  backgroundColor?: string;
  boxShadow?: string;
  display?: string;
  flexDirection?: CSSProperties["flexDirection"];
  justifyContent?: string;
  alignItems?: string;
  alignSelf?: string;
  padding?: string;
  margin?: string;
  gap?: string;
  extraClass?: string;
  transform?: string;
};

export const Container = ({
  children,
  width = "100%",
  height,
  border = "1px solid",
  borderColor = "var(--primary)",
  borderRadius = "8px",
  backgroundColor = "transparent",
  boxShadow = "var(--shadow-s)",
  display = "flex",
  flexDirection = "column",
  justifyContent,
  alignItems = "center",
  alignSelf,
  padding,
  margin,
  gap = "8px",
  extraClass = "",
}: ContainerProps) => (
  <div
    className={`container-base-styles ${extraClass}`}
    style={{
      width,
      height,
      border,
      borderColor,
      borderRadius,
      backgroundColor,
      boxShadow,
      display,
      flexDirection,
      justifyContent,
      alignItems,
      alignSelf,
      padding,
      margin,
      gap,
    }}
  >
    {children}
  </div>
);
