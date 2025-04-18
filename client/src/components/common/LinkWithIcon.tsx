import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

type LinkWithIconProps = {
  link: string;
  className?: string;
  icon: IconDefinition;
  iconSize?: SizeProp;
  linkText: string;
  onClick?: () => void;
};

export const LinkWithIcon = ({
  link,
  className,
  icon,
  iconSize,
  linkText,
  onClick,
}: LinkWithIconProps) => {
  const location = useLocation();
  const isActive = location.pathname === link;
  const combinedClassName = `${className} ${isActive ? "active-link" : ""}`;

  return (
    <Link to={link} className={combinedClassName} onClick={onClick}>
      <FontAwesomeIcon icon={icon} size={iconSize} />
      <p>{linkText}</p>
    </Link>
  );
};
