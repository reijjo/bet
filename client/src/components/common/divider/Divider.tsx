import "./Divider.css";

interface DividerProps {
  color?: string;
  thickness?: number;
  width?: number;
}

export const Divider = ({
  color = "var(--primary-500)",
  thickness = 1,
  width = 100,
}: DividerProps) => {
  return (
    <div
      className="divider"
      style={{ borderTop: `${thickness}px solid ${color}`, width: `${width}%` }}
    ></div>
  );
};
