import "./VerifyComponents.css";

import { useNavigate } from "react-router-dom";
import { Button2 } from "../../../components";

export const NoAccount = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="no-account">
      <h4>No account found</h4>
      <p>Please register.</p>
      <Button2
        type="button"
        className="btn2-cta btn-top-margin"
        width="100%"
        onClick={handleRegisterClick}
      >
        Register
      </Button2>
    </div>
  );
};
