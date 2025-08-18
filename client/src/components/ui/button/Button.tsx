type ButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  className: string;
  onClick?: () => void;
  // style?: React.CSSProperties;
  disabled?: boolean;
  width?: string;
  height?: string;
  margin?: string;
  border?: string;
  borderColor?: string;
};

export const Button = ({
  children,
  type = "button",
  className,
  onClick,
  disabled,
  width = "100%",
  height = "2.5rem",
  margin = "0",
  border = "1px solid",
  borderColor = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={{ width, height, margin, border, borderColor }}
    >
      {children}
    </button>
  );
};
