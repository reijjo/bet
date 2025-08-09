type DividerWithTextProps = {
  text: string;
  margin?: string;
  color?: string;
};

export const DividerWithText = ({
  text,
  margin = "8px 0",
  color,
}: DividerWithTextProps) => (
  <div className="divider-with-text" style={{ margin, color }}>
    <span>{text}</span>
  </div>
);
