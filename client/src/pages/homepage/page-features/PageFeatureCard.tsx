import "./PageFeatureCard.css";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container2 } from "../../../components";

interface PageFeatureCardProps {
  header: string;
  text: string;
  icon: IconProp;
}

export const PageFeatureCard = ({
  header,
  text,
  icon,
}: PageFeatureCardProps) => {
  return (
    <Container2 className="page-feature-card">
      <FontAwesomeIcon icon={icon} size="2x" />
      <div className="page-feature-card-text">
        <h4>{header}</h4>
        <p>{text}</p>
      </div>
    </Container2>
  );
};
