import { useState } from "react";
import { Button2 } from "../../../components/ui/v2/button/Button2";
import { TextInput2 } from "../../../components/ui/v2/inputs/TextInput2";
import "./Forgot.css";
import { useForgotPasswordMutation } from "../../../features/api/userApi";
import { Message } from "../../../components/common/message/Message";
import { MessageTypes } from "../../../utils/enums";

const Forgot = () => {
  const [email, setEmail] = useState<string>("");
  const [forgotPassword, { isLoading, isError }] = useForgotPasswordMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await forgotPassword(email).unwrap();
      setEmail("");
    } catch (error) {
      console.error("Failed to send reset link:", error);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-content">
        <h2 className="forgot-password-title">Forgot Password?</h2>
        <div className="forgot-text">
          <p>
            No worries! Just enter your email address below, and we'll send you
            a link to reset your password.
          </p>
        </div>
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
            {(isError || isLoading) && (
              <Message
                type={isError ? MessageTypes.Error : MessageTypes.Success}
                message={
                  isError
                    ? "Failed to send reset link. Please try again."
                    : "Reset link sent successfully!"
                }
                // width="100%"
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
      </div>
    </div>
  );
};

export default Forgot;
