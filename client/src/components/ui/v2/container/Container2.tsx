import "./Container2.css";

interface Container2Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: string;
  height?: string;
}

export const Container2 = ({ children }: Container2Props) => (
  <div className="container2">{children}</div>
);
