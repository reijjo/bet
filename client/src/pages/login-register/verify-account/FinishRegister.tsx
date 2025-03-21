// import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, Container, TextInput } from "../../../components";
import { InputErrorContainer } from "../../../components/common/inputs/input-errors/InputErrorContainer";
import { useRegisterUserMutation } from "../../../features/api/userApi";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
// import { Message } from "../../../components/common/message/Message";
// import { MessageTypes } from "../../../utils/enums";
// import { getErrorMessage } from "../../../utils/helperFunctions";
import {
  isValidPassword,
  isValidUsername,
} from "../../../utils/input-validators/registerValid";
import { RegisterValues } from "../../../utils/types";

export const FinishRegister = () => {
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<RegisterValues>({
    // mode: "onChange", criteriaMode: "all"
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const registerState = useAppSelector(
    (state: RootState) => state.register.email,
  );
  console.log("REGISTER STATE", registerState);

  const onSubmit: SubmitHandler<RegisterValues> = (data) => {
    const userToCreate = { ...data, email: registerState };
    console.log("DATA", userToCreate);
    // finishRegister({ ...data, username: data.username?.trim().toLowerCase() });
  };

  const passwordMatcher = watch("password");

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
          {...register("password2", {
            validate: (value) =>
              value === passwordMatcher || "Passwords don't match",
          })}
        />
        {errors.password2 && (
          <InputErrorContainer errors={errors.password2?.types || {}} />
        )}
        {/* {(isFinishing || isFinishError) && (
					<Message
						message={
							isFinishing
								? "Finishing your account..."
								: getErrorMessage(finishError)
						}
						type={isFinishing ? MessageTypes.Info : MessageTypes.Error}
						width="75%"
					/>
				)} */}
        <Button
          type="submit"
          className="btn btn-filled"
          children="create account"
          width="75%"
          margin="1rem 0 0"
        />
      </form>
    </Container>
  );
};
