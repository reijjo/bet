import "./FeatureCard.css";

type FeatureCardProps = {
  highlighted?: string;
  text: string;
  image: string;
  imageWidth?: string;
  extraClass?: string;
  align?: string;
};

export const FeatureCard = ({
  highlighted,
  text,
  image,
  imageWidth = "100%",
  align: alignSelf,
  extraClass,
}: FeatureCardProps) => {
  return (
    <figure className={`home-feature-card ${extraClass}`} style={{ alignSelf }}>
      <figcaption>
        <span>{highlighted}</span> {text}
      </figcaption>
      <img src={image} alt={highlighted} width={imageWidth} />
    </figure>
  );
};
