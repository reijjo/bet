type ButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  className: string;
  onClick?: () => void;
  // style?: React.CSSProperties;
  disabled?: boolean;
  width?: string;
  margin?: string;
};

export const Button = ({
  children,
  type = "button",
  className,
  onClick,
  disabled,
  width = "100%",
  margin = "0",
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={{ width, margin }}
    >
      {children}
    </button>
  );
};
