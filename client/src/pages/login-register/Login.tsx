import { useState } from "react";

import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import {
  Button,
  Container,
  DividerWithText,
  OauthButton,
  TextInput,
} from "../../components";
import { InputErrorContainer } from "../../components/common/inputs/input-errors/InputErrorContainer";
import { Message } from "../../components/common/message/Message";
import { useLoginMutation } from "../../features/api/authApi";
import { MessageTypes } from "../../utils/enums";
import { getErrorMessage } from "../../utils/helperFunctions";
import { LoginValues } from "../../utils/types";

const ForgotPassword = () => (
  <Link to="/forgot" className="none-styles form-input-text">
    <p className="text-btn-styles">Forgot Password?</p>
  </Link>
);

export const Login = () => {
  const [login, { data, isLoading, isError, error }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ mode: "onSubmit", reValidateMode: "onSubmit" });

  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    try {
      const response = await login({
        ...data,
        login: data.login.toLowerCase(),
      });
      console.log("RESPONSE", response);
    } catch (error) {
      console.log("ERROR", error);
    }
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
        <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
          <p className="form-header">Login to track your bets.</p>
          <TextInput
            className="form-input-text"
            type="text"
            label="Username / Email"
            id="loginName"
            placeholder="Username or Email..."
            {...register("login", { required: "Username/Email is required" })}
          />
          {errors.login && <InputErrorContainer errors={errors.login} />}
          <TextInput
            className="form-input-text"
            type="password"
            label="Password"
            id="loginPasswd"
            placeholder="Password..."
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <InputErrorContainer errors={errors.password} />}
          <ForgotPassword />
          {(isError || isLoading) && (
            <Message
              message={isLoading ? "Logging in..." : getErrorMessage(error)}
              type={isLoading ? MessageTypes.Info : MessageTypes.Error}
              width="75%"
            />
          )}

          <Button
            type="submit"
            className="btn btn-filled"
            children="Login"
            width="75%"
          />
        </form>
        <DividerWithText text="or" />
        <OauthButton
          provider="Google"
          icon={faGoogle}
          action="login"
          disabled
        />
        <OauthButton
          provider="Facebook"
          icon={faFacebook}
          action="login"
          disabled
        />

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
