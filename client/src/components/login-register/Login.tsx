import { ChangeEvent, useState } from "react";

import {
  faFacebook,
  faGoogle,
  faMicrosoft,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

import { Button } from "../common/button/Button";
import { OauthButton } from "../common/button/OauthButton";
import { Container } from "../common/container/Container";
import { DividerWithText } from "../common/divider/DividerWithText";
import { TextInput } from "../common/inputs/TextInput";

export const Login = () => {
  const [loginName, setLoginName] = useState("");

  const handleLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginName(e.target.value);
  };

  return (
    <Container
      width="min(400px, 95%)"
      border="0.5px solid"
      borderColor="var(--primary-700)"
      padding="24px 16px"
      margin="0 auto"
      alignSelf="center"
      boxShadow="var(--shadow-test)"
      gap="16px"
    >
      <form className="form-register">
        <p className="form-header">Login to track your bets.</p>
        <TextInput
          className="form-input-text"
          type="text"
          label="User"
          name="loginName"
          id="loginName"
          value={loginName}
          onChange={handleLogin}
          placeholder="Username or Email..."
        />
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
  );
};
