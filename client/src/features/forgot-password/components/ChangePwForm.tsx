import "./ForgotPwForm.css";

import { useState } from "react";
import { Button2, Message, TextInput2 } from "../../../components";
import { RegisterUserApiResponse } from "../../../utils/api-response-types";
import { useUpdateUserMutation } from "../../verify-account/api/verifyApiSlice";
import { MessageTypes } from "../../../utils/enums";
import { getErrorMessage } from "@utils/errors/error-helpers";

interface ChangePwFormProps {
  data: RegisterUserApiResponse;
}

export const ChangePwForm = ({ data }: ChangePwFormProps) => {
  const [pw, setPw] = useState<string>("");
  const [pw2, setPw2] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);

  const [updatePw, { data: pwData, isLoading, isError, error }] =
    useUpdateUserMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pw !== pw2) {
      setFormError("Passwords do not match");
      return;
    }
    setFormError(null);

    await updatePw({ id: data.data?.id as number, password: pw });
  };

  console.log("Changepw form token", data);
  console.log("pwData", pwData);
  console.log("message", formError);

  return (
    <form className="forgot-form" onSubmit={handleSubmit}>
      <div className="forgot-form-group">
        <TextInput2
          type="password"
          id="pw"
          name="pw"
          label="New Password"
          placeholder="New Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
          width="100%"
        />
        <TextInput2
          type="password"
          id="pw2"
          name="pw2"
          label="Confirm Password"
          placeholder="Confirm Password"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          required
          width="100%"
        />
        {formError && <Message type={MessageTypes.Error} message={formError} />}
        {(isError || pwData) && (
          <Message
            type={isError ? MessageTypes.Error : MessageTypes.Success}
            message={isError ? getErrorMessage(error) : pwData?.message}
          />
        )}
      </div>
      <Button2
        type="submit"
        className="btn2-cta"
        width="100%"
        disabled={isLoading}
      >
        {isLoading ? "Changing..." : "Change Password"}
      </Button2>
    </form>
  );
};
