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
import { initialRegisterValues } from "../../utils/defaults/defaults";
import { RegisterValues } from "../../utils/types";

export const Register = () => {
  const [regEmail, setRegEmail] = useState<RegisterValues>(
    initialRegisterValues,
  );

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegEmail({ ...regEmail, [name]: value });
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
          name="email"
          id="email"
          value={regEmail.email}
          onChange={handleEmailChange}
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
