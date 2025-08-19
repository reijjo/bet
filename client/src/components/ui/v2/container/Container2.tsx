import "./Container2.css";

interface Container2Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
}

export const Container2 = ({ children, className, width }: Container2Props) => (
  <div className={`container2 ${className}`} style={{ width }}>
    {children}
  </div>
);
