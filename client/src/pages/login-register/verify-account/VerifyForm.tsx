import { ChangeEvent, FormEvent, useState } from "react";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit/react";

import { Button, TextInput } from "../../../components";
import { Message } from "../../../components/common/message/Message";
import { RegisterUserApiResponse } from "../../../utils/api-response-types";
import { initialRegisterValues } from "../../../utils/defaults/defaults";
import { MessageTypes } from "../../../utils/enums";
import { getErrorMessage } from "../../../utils/helperFunctions";
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
  const [regUser, setRegUser] = useState<RegisterValues>({
    ...initialRegisterValues,
    email: data?.data ?? "",
  });

  const handleVerifyInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegUser({ ...regUser, [name]: value });
  };

  const handleFinishAccount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    finishRegister(regUser);
  };
  return (
    <form className="form-register" onSubmit={handleFinishAccount}>
      <p className="form-header" style={{ marginBottom: 0 }}>
        Finish your account
      </p>
      <p style={{ marginBottom: 8 }}>{data?.data}</p>
      <TextInput
        className="form-input-text"
        type="text"
        label="Username"
        name="username"
        id="username"
        placeholder="username"
        onChange={handleVerifyInput}
      />
      <TextInput
        className="form-input-text"
        type="text"
        label="Password"
        name="password"
        id="password"
        placeholder="password"
        onChange={handleVerifyInput}
      />
      <TextInput
        className="form-input-text"
        type="text"
        label="Confirm password"
        name="password2"
        id="password2"
        placeholder="confirm password"
        onChange={handleVerifyInput}
      />
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
