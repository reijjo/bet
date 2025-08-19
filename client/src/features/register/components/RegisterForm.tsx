import "./RegisterForm.css";

import {
  Button2,
  Container2,
  TextInput,
  InputErrorContainer,
  Message,
  Loading,
} from "../../../components";
import { MessageTypes } from "../../../utils/enums";
import { getErrorMessage } from "../../../utils/errors/error-helpers";
import { isValidEmail } from "../../../utils/input-validators/registerValid";
import { RegisterValues } from "../../../utils/types";

import { SubmitHandler, useForm } from "react-hook-form";
import { useLazyGetUserByEmailQuery } from "../api/registerApiSlice";
import { useAppDispatch } from "../../../store/hooks";
import { setRegister } from "../slices/registerSlice";
import { NavigateFunction } from "react-router-dom";

interface RegisterFormProps {
  setFade: (fade: boolean) => void;
  navigate: NavigateFunction;
}

export const RegisterForm = ({ setFade, navigate }: RegisterFormProps) => {
  const [checkDuplicateEmail, { isLoading, isError, error }] =
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

  const onSubmit: SubmitHandler<RegisterValues> = async (data) => {
    const sanitazedEmail = data.email.trim().toLowerCase();

    try {
      const result = await checkDuplicateEmail(sanitazedEmail);

      if (result.isSuccess) {
        setFade(true);
        dispatch(setRegister({ ...data, email: sanitazedEmail }));
        setTimeout(() => {
          navigate("/register/finish", { replace: true });
        }, 1000);
      }
    } catch (error) {
      console.error("Verification error:", error);
    }
  };

  return (
    <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
      <Container2 className="plain-container" width="75%">
        <TextInput
          className="register-form-input-text"
          type="email"
          label="Email"
          id="email"
          placeholder="user@tarpit.com"
          required
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
      </Container2>
      {(isLoading || isError) && (
        <Message
          message={
            isLoading ? (
              <Loading color="message-info" text="Checking email..." />
            ) : (
              getErrorMessage(error)
            )
          }
          type={isLoading ? MessageTypes.Info : MessageTypes.Error}
          width="75%"
        />
      )}
      <Button2
        type="submit"
        className="btn2-cta"
        children="sign up"
        width="75%"
        margin="0.75rem 0 0"
        disabled={isLoading}
      />
    </form>
  );
};
