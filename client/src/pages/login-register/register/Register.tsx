import "../LoginRegister.css";

import { useEffect, useState } from "react";

import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import penkit from "../../../assets/images/login-register/penkit-opti.webp";
import {
  Container,
  DividerWithText,
  Loading,
  OauthButton,
  TextInput,
} from "../../../components";
import { InputErrorContainer } from "../../../components/common/inputs/input-errors/InputErrorContainer";
import { Message } from "../../../components/common/message/Message";
import { useLazyGetUserByEmailQuery } from "../../../features/api/userApi";
import { setRegister } from "../../../features/registerSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { MessageTypes } from "../../../utils/enums";
import { getErrorMessage } from "../../../utils/helperFunctions";
import { isValidEmail } from "../../../utils/input-validators/registerValid";
import { RegisterValues } from "../../../utils/types";
import { Button2 } from "../../../components/ui/v2/button/Button2";

const Register = () => {
  const [fade, setFade] = useState(false);
  const [checkDuplicateEmail, { isLoading, isError, error }] =
    useLazyGetUserByEmailQuery();

  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dash";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

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
    <div className="login-page">
      <Container
        width="min(500px, 95%)"
        border="0.5px solid"
        borderColor="transparent"
        padding="24px 16px"
        margin="2rem auto"
        height="100%"
        alignSelf="center"
        justifyContent="center"
        boxShadow="none"
        gap="1rem"
        extraClass={`${fade ? "fade-out-to-bottom" : ""}`}
      >
        <div className="form-headers">
          <h3>Create your account</h3>
          <h6>Start tracking your bets at Tärpit</h6>
        </div>
        <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
          <Container border="none" boxShadow="none" gap="0.5rem" margin="0">
            <TextInput
              className="form-input-text"
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
          </Container>
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
        <DividerWithText text="or login with" />
        <div className="oauth-buttons">
          <OauthButton
            provider="Google"
            icon={faGoogle}
            action="login"
            disabled
          />
          <OauthButton
            provider="Facebook"
            icon={faFacebook}
            action="login"
            disabled
          />
        </div>

        <p className="login-p">
          Already have an account?{" "}
          <Link to="/login" className="btn-text">
            Log in!
          </Link>
        </p>
      </Container>
      <img src={penkit} alt="penkit" loading="eager" />
    </div>
  );
};

export default Register;
