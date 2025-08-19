import "./RegisterForm.css";

import { Message, Button2, Container2, Loading } from "../../../components";
import { RegisterValues } from "../../../utils/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { MessageTypes } from "../../../utils/enums";
import { MessageProps } from "../../../components/shared/message/Message";
import { useState } from "react";
import { RootState } from "../../../store/store";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetRegister } from "../slices/registerSlice";
import { getErrorMessage } from "../../../utils/errors/error-helpers";
import { useCreateUserMutation } from "../api/registerApiSlice";
import { FinishInputs } from "./FinishInputs";

export const FinishRegisterForm = () => {
  const [message, setMessage] = useState<MessageProps>({
    message: "",
    type: MessageTypes.Info,
  });

  const [createUser, { isLoading }] = useCreateUserMutation();

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
      const res = await createUser(userToCreate).unwrap();

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
    <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
      <Container2 className="plain-container" width="75%">
        <FinishInputs register={register} watch={watch} errors={errors} />
        {(message.message !== "" || isLoading) && (
          <Message
            message={
              isLoading ? (
                <Loading color="message-info" text="Creating your account..." />
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
          width="100%"
          margin="1rem 0 0"
          disabled={isLoading}
        />
      </Container2>
    </form>
  );
};
