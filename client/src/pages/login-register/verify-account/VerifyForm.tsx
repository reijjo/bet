import { useEffect } from "react";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, TextInput } from "../../../components";
import { InputErrorContainer } from "../../../components/common/inputs/input-errors/InputErrorContainer";
import { Message } from "../../../components/common/message/Message";
import { RegisterUserApiResponse } from "../../../utils/api-response-types";
import { MessageTypes } from "../../../utils/enums";
import { getErrorMessage } from "../../../utils/helperFunctions";
import {
  isValidPassword,
  isValidUsername,
} from "../../../utils/input-validators/registerValid";
import { RegisterValues } from "../../../utils/types";

interface VerifyFormProps {
  data?: RegisterUserApiResponse;
  finishRegister: (user: RegisterValues) => void;
  isFinishing: boolean;
  isFinishError: boolean;
  finishError: FetchBaseQueryError | SerializedError | undefined;
}

export const VerifyForm = ({
  data,
  finishRegister,
  isFinishing,
  isFinishError,
  finishError,
}: VerifyFormProps) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm<RegisterValues>({ mode: "onChange", criteriaMode: "all" });

  useEffect(() => {
    setValue("email", data?.data || "");
  }, [data?.data, setValue]);

  const onSubmit: SubmitHandler<RegisterValues> = (data) => {
    finishRegister(data);
  };

  const passwordMatcher = watch("password");
  console.log("WAHT IS WATCH", watch());

  return (
    <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
      <p className="form-header" style={{ marginBottom: 0 }}>
        Finish your account
      </p>
      <p style={{ marginBottom: 8 }}>{data?.data}</p>
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
      {(isFinishing || isFinishError) && (
        <Message
          message={
            isFinishing
              ? "Finishing your account..."
              : getErrorMessage(finishError)
          }
          type={isFinishing ? MessageTypes.Info : MessageTypes.Error}
          width="75%"
        />
      )}
      <Button
        type="submit"
        className="btn btn-filled"
        children="create account"
        width="75%"
        margin="1rem 0 0"
      />
    </form>
  );
};
