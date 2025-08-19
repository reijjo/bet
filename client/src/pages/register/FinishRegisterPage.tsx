import "./RegisterPage.css";
import penkit from "../../assets/images/login-register/penkit-opti.webp";
import { FinishRegisterForm } from "../../features/register";

const FinishRegisterPage = () => {
  return (
    <div className="register-page">
      <div className="register-page-container">
        <div className="form-headers">
          <h3>Finish your account</h3>
          <h6>this is the last step</h6>
        </div>
        <FinishRegisterForm />
      </div>
      <img src={penkit} alt="penkit" loading="eager" />
    </div>
  );
};

export default FinishRegisterPage;
