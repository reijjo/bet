import "./LoginPage.css";

import { useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/fishing.png";
import tennis from "../../assets/images/login-register/tennis-opti.webp";
import { DividerWithText } from "../../components";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { LoginForm } from "../../features/login";
import { LoginOauth } from "../../features/login/components/LoginOauth";

const LoginPage = () => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dash";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="login-page">
      <div className="login-page-container">
        <div className="form-headers">
          <div className="logo-headers">
            <h3>Login</h3>
            <img src={logo} alt="logo" height={32} width={32} />
          </div>
          <h6>nice to have you here!</h6>
        </div>
        <LoginForm navigate={navigate} from={from} />
        <DividerWithText text="or" />
        <LoginOauth />
        <p className="login-p">
          Need an account?{" "}
          <Link to="/register" className="btn-text">
            Register here!
          </Link>
        </p>
      </div>
      <img
        src={tennis}
        alt="tennis"
        loading="lazy"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default LoginPage;
