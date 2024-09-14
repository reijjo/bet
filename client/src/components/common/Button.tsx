type ButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  className: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

export const Button = ({
  children,
  type,
  className,
  onClick,
  style,
}: ButtonProps) => {
  return (
    <button type={type} className={className} onClick={onClick} style={style}>
      {children}
    </button>
  );
};
