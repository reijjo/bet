import "./RegisterOauth.css";

import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { OauthButton } from "../../../components";

export const RegisterOauth = () => {
  return (
    <div className="register-oauth-buttons">
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
