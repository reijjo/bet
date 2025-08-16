import "./LoginRegister.css";
import penkit from "../../assets/images/login-register/penkit-opti.jpg";

import { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Container, Loading, TextInput } from "../../components";
import { InputErrorContainer } from "../../components/common/inputs/input-errors/InputErrorContainer";
import { Message, MessageProps } from "../../components/common/message/Message";
import { useRegisterUserMutation } from "../../features/api/userApi";
import { resetRegister } from "../../features/registerSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { MessageTypes } from "../../utils/enums";
import { getErrorMessage } from "../../utils/helperFunctions";
import {
  isValidPassword,
  isValidUsername,
} from "../../utils/input-validators/registerValid";
import { RegisterValues } from "../../utils/types";
import { Button2 } from "../../components/common/v2.0/button/Button2";

const FinishRegister = () => {
  const [message, setMessage] = useState<MessageProps>({
    message: "",
    type: MessageTypes.Info,
  });
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    register,
    formState: { errors },
    reset,
    watch,
    handleSubmit,
  } = useForm<RegisterValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const passwordMatcher = watch("password");

  const registerState = useAppSelector(
    (state: RootState) => state.register.email
  );
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<RegisterValues> = async (data) => {
    const sanitizedUsername = data.username?.trim().toLowerCase();

    const userToCreate = {
      ...data,
      username: sanitizedUsername,
      email: registerState,
    };

    try {
      const res = await registerUser(userToCreate).unwrap();

      setMessage({
        message: res.message as string,
        type: MessageTypes.Success,
      });

      reset();
      dispatch(resetRegister());
    } catch (error) {
      setMessage({
        message: getErrorMessage(error),
        type: MessageTypes.Error,
      });
    }
  };

  return (
    <section className="login-page">
      <Container
        width="min(500px, 95%)"
        border="0.5px solid"
        borderColor="transparent"
        padding="24px 16px"
        margin="2rem auto"
        height="100%"
        alignSelf="center"
        justifyContent="center"
        boxShadow="none"
        gap="1rem"
        extraClass="animate-fade-in"
      >
        <div className="form-headers">
          <h3>Finish your account</h3>
          <h6>this is the last step</h6>
        </div>
        <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            className="form-input-text"
            type="text"
            label="Username"
            id="username"
            placeholder="Username"
            required
            {...register("username", isValidUsername)}
          />
          {errors.username && (
            <InputErrorContainer errors={errors.username?.types || {}} />
          )}
          <TextInput
            className="form-input-text"
            type="password"
            label="Password"
            id="password"
            placeholder="Password"
            required
            isPassword
            {...register("password", isValidPassword)}
          />
          {errors.password && (
            <InputErrorContainer
              errors={errors.password?.types || {}}
              field="Password"
            />
          )}
          <TextInput
            className="form-input-text"
            type="password"
            label="Confirm password"
            id="password2"
            placeholder="Confirm Password"
            required
            isPassword
            {...register("password2", {
              validate: (value) =>
                value === passwordMatcher || "Passwords don't match",
            })}
          />
          {errors.password2 && (
            <InputErrorContainer errors={errors.password2?.types || {}} />
          )}

          {(message.message !== "" || isLoading) && (
            <Message
              message={
                isLoading ? (
                  <Loading
                    color="message-info"
                    text="Creating your account..."
                  />
                ) : (
                  (message.message as string)
                )
              }
              type={isLoading ? MessageTypes.Info : message.type}
              width="75%"
            />
          )}
          <Button2
            type="submit"
            className="btn2-cta"
            children="create account"
            width="75%"
            margin="1rem 0 0"
            disabled={isLoading}
          />
        </form>
      </Container>
      <img src={penkit} alt="penkit" loading="eager" />
    </section>
  );
};

export default FinishRegister;
