import "./Loading.css";

interface LoadingProps {
  text?: string;
  color: string;
}
export const Loading = ({
  text = "Loading...",
  color = "white",
}: LoadingProps) => {
  return (
    <div className="loading-component" data-testid="loading-component">
      <span
        className="spinner"
        style={{
          background: `conic-gradient(#0000 10%, ${color})`,
        }}
      ></span>
      {text}
    </div>
  );
};
