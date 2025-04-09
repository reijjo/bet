import "./LoginRegister.css";

// import { ChangeEvent, SyntheticEvent, useState } from "react";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import penkit from "../../assets/images/login-register/penkit-opti.jpg";
import {
  Button,
  Container,
  DividerWithText,
  OauthButton,
  TextInput,
} from "../../components";
import { InputErrorContainer } from "../../components/common/inputs/input-errors/InputErrorContainer";
import { Message } from "../../components/common/message/Message";
import { useLazyGetUserByEmailQuery } from "../../features/api/userApi";
import { setRegister } from "../../features/registerSlice";
import { useAppDispatch } from "../../store/hooks";
import { MessageTypes } from "../../utils/enums";
import { getErrorMessage } from "../../utils/helperFunctions";
import { isValidEmail } from "../../utils/input-validators/registerValid";
import { RegisterValues } from "../../utils/types";

export const Register = () => {
  const [checkDuplicateEmail, { data: fetchData, isLoading, isError, error }] =
    useLazyGetUserByEmailQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<RegisterValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterValues> = async (data) => {
    const sanitazedEmail = data.email.trim().toLowerCase();
    console.log(data);

    try {
      const result = await checkDuplicateEmail(sanitazedEmail);

      if (result.isSuccess) {
        dispatch(setRegister({ ...data, email: sanitazedEmail }));
        navigate("/register/finish");
      }
    } catch (error) {
      console.error("Verification error:", error);
    }
  };

  console.log("error", error);
  console.log("isError", isError);
  console.log("isLoading", isLoading);
  console.log("fetchData", fetchData);

  return (
    <div className="login-page">
      <Container
        width="min(600px, 95%)"
        border="0.5px solid"
        borderColor="transparent"
        padding="24px 16px"
        margin="2rem auto"
        height="100%"
        alignSelf="center"
        justifyContent="center"
        boxShadow="none"
        // backgroundColor="var(--primary)"
        gap="1rem"
      >
        <div className="form-headers">
          <h3>Create your account</h3>
          <h6>Start tracking your bets at Tärpit</h6>
        </div>
        <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
          <Container border="none" boxShadow="none" gap="0.5rem" margin="0">
            <TextInput
              className="form-input-text"
              type="text"
              label="Email"
              id="email"
              placeholder="user@tarpit.com"
              errorStyle={!!errors.email}
              {...register("email", {
                ...isValidEmail,
                onBlur: () => clearErrors("email"),
              })}
              aria-invalid={errors.email?.types ? "true" : "false"}
            />
            {errors.email && (
              <InputErrorContainer errors={errors.email?.types || {}} />
            )}
          </Container>
          {isLoading && (
            <Message
              message="Checking email..."
              type={MessageTypes.Info}
              width="75%"
            />
          )}
          {isError && (
            <Message
              message={getErrorMessage(error)}
              type={MessageTypes.Error}
              width="75%"
            />
          )}
          <Button
            type="submit"
            className="btn btn-filled"
            children="sign up"
            width="75%"
            margin="0.75rem 0 0"
          />
        </form>
        <DividerWithText text="or login with" />
        <div className="oauth-buttons">
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
        </div>

        <p className="login-p">
          Already have an account?{" "}
          <Link to="/login" className="btn-text">
            Log in!
          </Link>
        </p>
      </Container>
      <img src={penkit} alt="tennis" loading="eager" />
    </div>
  );
};
