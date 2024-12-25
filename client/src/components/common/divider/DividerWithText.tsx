type DividerWithTextProps = {
  text: string;
  margin?: string;
};

export const DividerWithText = ({
  text,
  margin = "8px 0",
}: DividerWithTextProps) => (
  <div className="divider-with-text" style={{ margin }}>
    <span>{text}</span>
  </div>
);
