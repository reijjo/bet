import "./RegisterPage.css";

import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import penkit from "../../assets/images/login-register/penkit-opti.webp";
import { DividerWithText } from "../../components";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { RegisterForm, RegisterOauth } from "../../features/register";

const RegisterPage = () => {
  const [fade, setFade] = useState(false);

  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dash";
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="register-page">
      <div
        className={`register-page-container ${fade ? "fade-out-to-bottom" : ""}`}
      >
        <div className="form-headers">
          <h3>Create your account</h3>
          <h6>Start tracking your bets at Tärpit</h6>
        </div>
        <RegisterForm setFade={setFade} navigate={navigate} />
        <DividerWithText text="or login with" />
        <RegisterOauth />
        <p className="login-p">
          Already have an account?{" "}
          <Link to="/login" className="btn-text">
            Log in!
          </Link>
        </p>
      </div>
      <img src={penkit} alt="penkit" loading="eager" />
    </div>
  );
};

export default RegisterPage;
