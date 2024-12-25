import "./Button.css";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type OauthButtonProps = {
  icon: IconProp;
  provider: string;
  action: "login" | "register";
  type?: "button" | "submit";
};

export const OauthButton = ({
  icon,
  provider,
  action,
  type = "button",
}: OauthButtonProps) => {
  const correctFormat = (): string => {
    if (action === "login") return "Login";
    return "Sign up";
  };

  return (
    <button className="btn btn-oauth" type={type}>
      <FontAwesomeIcon icon={icon} size="lg" className="oauth-logo-absolute" />
      <p>
        {correctFormat()} with {provider}
      </p>
    </button>
  );
};
