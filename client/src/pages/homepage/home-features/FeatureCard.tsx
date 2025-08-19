import "./FeatureCard.css";

type FeatureCardProps = {
  highlighted?: string;
  text: string;
  image: string;
  imageWidth?: string;
  align?: string;
};

export const FeatureCard = ({
  highlighted,
  text,
  image,
  imageWidth = "100%",
  align: alignSelf,
}: FeatureCardProps) => {
  return (
    <figure className="home-feature-card" style={{ alignSelf }}>
      <figcaption>
        <span>{highlighted}</span> {text}
      </figcaption>
      <img src={image} alt={highlighted} width={imageWidth} loading="eager" />
    </figure>
  );
};
