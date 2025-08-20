import "./ForgotPwPage.css";

import { ForgotPwForm } from "../../features/forgot-password";

const ForgotPwPage = () => {
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
        <ForgotPwForm />
      </div>
    </div>
  );
};

export default ForgotPwPage;
