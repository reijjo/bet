import "./ForgotPwForm.css";

import { useState } from "react";
import { Button2, Message, TextInput2 } from "../../../components";
import { useForgotPasswordMutation } from "../api/forgotPwApiSlice";
import { MessageTypes } from "../../../utils/enums";
import { getErrorMessage } from "@utils/errors/error-helpers";

export const ForgotPwForm = () => {
  const [email, setEmail] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  const [forgotPassword, { data, isLoading, isError, error }] =
    useForgotPasswordMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();

    try {
      const getLink = await forgotPassword(trimmedEmail).unwrap();
      setMsg(getLink.message);
      setEmail("");
    } catch (error) {
      console.error("Failed to send reset link:", error);
    }
  };

  return (
    <form className="forgot-form" onSubmit={handleSubmit}>
      <div className="forgot-form-group">
        <TextInput2
          type="email"
          id="email"
          name="email"
          label="Your Email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          width="100%"
        />
        {(isError || isLoading || data) && (
          <Message
            type={isError ? MessageTypes.Error : MessageTypes.Success}
            message={isError ? getErrorMessage(error) : msg}
          />
        )}
      </div>
      <Button2
        type="submit"
        className="btn2-cta"
        width="100%"
        disabled={isLoading}
      >
        {isLoading ? "Sending" : "Send Link"}
      </Button2>
    </form>
  );
};
