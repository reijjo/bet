import "./FeatureCard.css";

type FeatureCardProps = {
  highlighted?: string;
  text: string;
  image: string;
  extraClass?: string;
};

export const FeatureCard = ({
  highlighted,
  text,
  image,
  extraClass,
}: FeatureCardProps) => {
  return (
    <figure className={`home-feature-card ${extraClass}`}>
      <figcaption>
        <span>{highlighted}</span> {text}
      </figcaption>
      <img src={image} alt={highlighted} width="100%" />
    </figure>
  );
};
