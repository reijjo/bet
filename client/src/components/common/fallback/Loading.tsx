import "./Loading.css";

interface LoadingProps {
  text?: string;
}
export const Loading = ({ text = "Loading..." }: LoadingProps) => {
  return (
    <div className="loading-component" data-testid="loading-component">
      <span className="loader"></span>
      {text}
    </div>
  );
};
