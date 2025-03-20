import "./LoginRegister.css";

// import { ChangeEvent, SyntheticEvent, useState } from "react";
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
// import { Message } from "../../components/common/message/Message";
// import { useRegisterMutation } from "../../features/api/authApi";
// import { initialRegisterValues } from "../../utils/defaults/defaults";
// import { MessageType, MessageTypes } from "../../utils/enums";
import { isValidEmail } from "../../utils/input-validators/registerValid";
import { RegisterValues } from "../../utils/types";

export const Register = () => {
  // const [regEmail, setRegEmail] = useState<RegisterValues>(
  //   initialRegisterValues,
  // );
  // const [inputError, setInputError] = useState("");
  // const [messageType, setMessageType] = useState<MessageType>(
  //   MessageTypes.Error,
  // );

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
  const onSubmit: SubmitHandler<RegisterValues> = (data) => console.log(data);

  // const [register, { isLoading, isError, error }] = useRegisterMutation();

  // const hasError = isError || error || inputError;

  // const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setRegEmail({ ...regEmail, [name]: value });
  // };

  // const handleRegister = async (e: SyntheticEvent) => {
  //   e.preventDefault();

  //   const sanitezedEmail = regEmail.email.trim().toLowerCase();

  //   if (!isEmail(sanitezedEmail)) {
  //     setInputError("Invalid email");
  //     setMessageType(MessageTypes.Error);
  //     return;
  //   }

  //   try {
  //     const response = await register({
  //       ...regEmail,
  //       email: sanitezedEmail,
  //     }).unwrap();
  //     console.log("response", response);
  //     setInputError(response.message);
  //     setMessageType(MessageTypes.Success);

  //     setRegEmail(initialRegisterValues);
  //   } catch (error: unknown) {
  //     setMessageType(MessageTypes.Error);

  //     const apiError = error as { data: ApiErrorResponse };
  //     setInputError(apiError?.data?.message);
  //     console.log("INPUTERROR", error);
  //   }
  // };

  // console.log("iserror", isError);
  // console.log("error", error);
  // console.log("inputerror", inputError);

  return (
    <Container
      width="min(400px, 95%)"
      border="0.5px solid"
      borderColor="rgba(255, 255, 255, 0.2)"
      padding="24px 16px"
      margin="2rem auto"
      alignSelf="center"
      boxShadow="var(--box-shadow)"
      gap="1rem"
    >
      <div className="form-headers">
        <h3>Sign up</h3>
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
          {/* {hasError && (
            <Message message={inputError} type={messageType} width="75%" />
          )}
          {isLoading && (
            <Message
              message="Registering..."
              type={MessageTypes.Info}
              width="75%"
            />
          )} */}
        </Container>
        <Button
          type="submit"
          className="btn btn-filled"
          children="sign up"
          width="75%"
          margin="0.75rem 0 0"
        />
      </form>
      <DividerWithText text="or login with" />
      <OauthButton provider="Google" icon={faGoogle} action="login" disabled />
      <OauthButton
        provider="Facebook"
        icon={faFacebook}
        action="login"
        disabled
      />

      <p className="login-p">
        Already have an account?{" "}
        <Link to="/login" className="btn-text">
          Log in!
        </Link>
      </p>
    </Container>
  );
};
