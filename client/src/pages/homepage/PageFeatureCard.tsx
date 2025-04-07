import "./PageFeatureCard.css";

interface PageFeatureCardProps {
  header: string;
  text: string;
}

export const PageFeatureCard = ({ header, text }: PageFeatureCardProps) => {
  return (
    <div className="page-feature-card">
      <h4>{header}</h4>
      <p>{text}</p>
    </div>
  );
};
