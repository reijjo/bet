import { useEffect } from "react";

import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/fishing.png";
import {
  Button,
  Container,
  DividerWithText,
  OauthButton,
  TextInput,
} from "../../components";
import { InputErrorContainer } from "../../components/common/inputs/input-errors/InputErrorContainer";
import { Message } from "../../components/common/message/Message";
import {
  useLazyGetSessionUserQuery,
  useLoginMutation,
} from "../../features/api/authApi";
import { loginUser } from "../../features/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { MessageTypes } from "../../utils/enums";
import { getErrorMessage } from "../../utils/helperFunctions";
import { LoginValues, User } from "../../utils/types";

const ForgotPassword = () => (
  <Link to="/forgot" className="none-styles form-input-text">
    <p className="text-btn-styles">Forgot Password?</p>
  </Link>
);

export const Login = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [fetchSession] = useLazyGetSessionUserQuery();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dash";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ mode: "onSubmit", reValidateMode: "onSubmit" });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    try {
      await login({
        ...data,
        login: data.login.trim().toLowerCase(),
      }).unwrap();

      // const sessionResult = await refetch().unwrap();
      const sessionResult = await fetchSession().unwrap();

      if (sessionResult?.success && sessionResult?.data) {
        dispatch(loginUser(sessionResult.data as User));
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  return (
    <div className="login-page">
      <Container
        width="min(400px, 95%)"
        border="0.5px solid"
        borderColor="var(--primary-700)"
        padding="24px 16px"
        margin="0 auto"
        alignSelf="center"
        boxShadow="var(--box-shadow)"
        gap="1rem"
        backgroundColor="var(--primary)"
      >
        <div className="form-headers">
          <div className="logo-headers">
            <h3>Login</h3>
            <img src={logo} alt="logo" height={32} width={32} />
          </div>
          <h6>welcome back</h6>
        </div>
        <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            className="form-input-text"
            type="text"
            label="Username / Email"
            id="loginName"
            placeholder="Username or Email..."
            {...register("login", { required: "Username/Email is required" })}
          />
          {errors.login && <InputErrorContainer errors={errors.login} />}
          <TextInput
            className="form-input-text"
            type="password"
            label="Password"
            id="loginPasswd"
            placeholder="Password..."
            autoComplete="off"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <InputErrorContainer errors={errors.password} />}
          <ForgotPassword />
          {(isError || isLoading) && (
            <Message
              message={isLoading ? "Logging in..." : getErrorMessage(error)}
              type={isLoading ? MessageTypes.Info : MessageTypes.Error}
              width="75%"
            />
          )}

          <Button
            type="submit"
            className="btn btn-filled"
            children="Login"
            width="75%"
          />
        </form>
        <DividerWithText text="or" />
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
          Need an account?{" "}
          <Link to="/register" className="btn-text">
            Register here!
          </Link>
        </p>
      </Container>
    </div>
  );
};
