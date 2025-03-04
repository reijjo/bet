import "./LoginRegister.css";

import { ChangeEvent, SyntheticEvent, useState } from "react";

import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

import {
  Button,
  Container,
  DividerWithText,
  OauthButton,
  TextInput,
} from "../../components";
import { Message } from "../../components/common/message/Message";
import { useRegisterMutation } from "../../features/api/authApi";
import { initialRegisterValues } from "../../utils/defaults/defaults";
import { MessageType, MessageTypes } from "../../utils/enums";
import { isEmail } from "../../utils/inputValidators";
import { ApiErrorResponse, RegisterValues } from "../../utils/types";

export const Register = () => {
  const [regEmail, setRegEmail] = useState<RegisterValues>(
    initialRegisterValues,
  );
  const [inputError, setInputError] = useState("");
  const [messageType, setMessageType] = useState<MessageType>(
    MessageTypes.Error,
  );

  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const hasError = isError || error || inputError;

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegEmail({ ...regEmail, [name]: value });
  };

  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!isEmail(regEmail.email)) {
      setInputError("Invalid email");
      setMessageType(MessageTypes.Error);
      return;
    }

    try {
      const response = await register(regEmail).unwrap();
      console.log("response", response);
      setInputError(response.message);
      setMessageType(MessageTypes.Success);

      setRegEmail(initialRegisterValues);
    } catch (error: unknown) {
      setMessageType(MessageTypes.Error);

      const apiError = error as { data: ApiErrorResponse };
      setInputError(apiError?.data?.message);
      console.log("INPUTERROR", error);
    }
  };

  console.log("iserror", isError);
  console.log("error", error);
  console.log("inputerror", inputError);

  return (
    <Container
      width="min(400px, 95%)"
      border="0.5px solid"
      borderColor="var(--primary-700)"
      padding="24px 16px"
      margin="2rem auto"
      alignSelf="center"
      boxShadow="var(--box-shadow)"
      gap="16px"
    >
      <form className="form-register" onSubmit={handleRegister}>
        <p className="form-header">Start tracking your bets at Tärpit</p>
        <Container
          border="none"
          boxShadow="none"
          gap="0"
          margin="0"
          width="100%"
        >
          <TextInput
            className="form-input-text"
            type="text"
            label="Email"
            name="email"
            id="email"
            value={regEmail.email}
            onChange={handleEmailChange}
            placeholder="user@tarpit.com"
            errorStyle={!!hasError}
            onFocus={() => setInputError("")}
          />
          {hasError && (
            <Message
              message={hasError ? inputError : "Registering..."}
              type={messageType}
              width="75%"
            />
          )}
          {isLoading && (
            <Message
              message="Registering..."
              type={MessageTypes.Info}
              width="75%"
            />
          )}
        </Container>
        <Button
          type="submit"
          className="btn btn-filled"
          children="sign up"
          width="75%"
        />
      </form>
      <DividerWithText text="or login with" />
      <OauthButton provider="Google" icon={faGoogle} action="login" />
      <OauthButton provider="Facebook" icon={faFacebook} action="login" />

      <p className="login-p">
        Already have an account?{" "}
        <Link to="/login" className="btn-text">
          Log in!
        </Link>
      </p>
    </Container>
  );
};
