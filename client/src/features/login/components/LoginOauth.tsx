import "./LoginOauth.css";

import { OauthButton } from "../../../components";

import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

export const LoginOauth = () => {
  return (
    <div className="login-oauth-buttons">
      <OauthButton provider="Google" icon={faGoogle} action="login" disabled />
      <OauthButton
        provider="Facebook"
        icon={faFacebook}
        action="login"
        disabled
      />
    </div>
  );
};
