import "./LoginRegister.css";

import { ChangeEvent, SyntheticEvent, useState } from "react";

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

export const Register = () => {
  const [regEmail, setRegEmail] = useState("");

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setRegEmail(e.target.value);
  };

  const handleRegister = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Registering with email:", regEmail);
  };

  return (
    <Container
      width="min(400px, 95%)"
      border="0.5px solid"
      borderColor="var(--primary-700)"
      padding="24px 16px"
      margin="0 auto"
      alignSelf="center"
      boxShadow="var(--box-shadow)"
      gap="16px"
    >
      <form className="form-register" onSubmit={handleRegister}>
        <p className="form-header">Start tracking your bets at Tärpit</p>
        <TextInput
          className="form-input-text"
          type="text"
          label="Email"
          name="regEmail"
          id="regEmail"
          value={regEmail}
          onChange={handleEmail}
          placeholder="user@tarpit.com"
        />
        <Button
          type="submit"
          className="btn btn-filled"
          children="sign up"
          width="75%"
        />
      </form>
      <DividerWithText text="or" />
      <OauthButton provider="Google" icon={faGoogle} action="register" />
      <OauthButton provider="Facebook" icon={faFacebook} action="register" />
      <OauthButton provider="Microsoft" icon={faMicrosoft} action="register" />

      <p className="login-p">
        Already have an account?{" "}
        <Link to="/login" className="btn-text">
          Log in!
        </Link>
      </p>
    </Container>
  );
};
