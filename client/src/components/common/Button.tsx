type ButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  className: string;
  onClick?: () => void;
};

export const Button = ({ children, type, className, onClick }: ButtonProps) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};
