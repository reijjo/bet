import { ChangeEvent, useState } from "react";

import {
  faFacebook,
  faGoogle,
  faMicrosoft,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

import {
  Button,
  Container,
  DividerWithText,
  OauthButton,
  TextInput,
} from "../../components";

export const Login = () => {
  const [loginName, setLoginName] = useState("");

  const handleLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginName(e.target.value);
  };

  return (
    <div className="login-page">
      <Container
        width="min(400px, 95%)"
        border="0.5px solid"
        borderColor="var(--primary-700)"
        padding="24px 16px"
        margin="0 auto"
        alignSelf="center"
        boxShadow="var(--shadow-test)"
        gap="1rem"
      >
        <form className="form-register">
          <p className="form-header">Login to track your bets.</p>
          <TextInput
            className="form-input-text"
            type="text"
            label="Username / Email"
            name="loginName"
            id="loginName"
            value={loginName}
            onChange={handleLogin}
            placeholder="Username or Email..."
          />
          <TextInput
            className="form-input-text"
            type="password"
            label="Password"
            name="looginPasswd"
            id="loginPasswd"
            placeholder="Password..."
            width="100%"
          />
          <button className="none-styles form-input-text">
            <p className="text-btn-styles">Forgot Password?</p>
          </button>
          <Button
            type="submit"
            className="btn btn-filled"
            children="Login"
            width="75%"
          />
        </form>
        <DividerWithText text="or" />
        <OauthButton provider="Google" icon={faGoogle} action="login" />
        <OauthButton provider="Facebook" icon={faFacebook} action="login" />
        <OauthButton provider="Microsoft" icon={faMicrosoft} action="login" />

        <p className="login-p">
          Need an account?{" "}
          <Link to="/register" className="btn-text">
            Register here!
          </Link>
        </p>
      </Container>
    </div>
  );
};
