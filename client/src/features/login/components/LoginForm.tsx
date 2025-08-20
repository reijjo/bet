import "./LoginForm.css";

import { Link, NavigateFunction } from "react-router-dom";
import { Button2, InputErrorContainer, TextInput } from "../../../components";
import { SubmitHandler, useForm } from "react-hook-form";

import { LoginValues, User } from "../../../utils/types";
import { useAppDispatch } from "../../../store/hooks";
import { useLoginMutation } from "../api/loginApiSlice";
import { loginUser } from "../../slices/authSlice";
import { useLazyGetSessionUserQuery } from "../../api/authApi";
import { LoginMessage } from "./LoginMessage";

const ForgotPassword = () => (
  <Link to="/forgot" className="none-styles form-input-text">
    <p className="text-btn-styles">Forgot Password?</p>
  </Link>
);

interface LoginFormProps {
  navigate: NavigateFunction;
  from: string;
}

export const LoginForm = ({ navigate, from }: LoginFormProps) => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [
    fetchSession,
    { isLoading: isFetching, isError: isFetchError, error: fetchError },
  ] = useLazyGetSessionUserQuery();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ mode: "onSubmit", reValidateMode: "onSubmit" });

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    try {
      const loginResult = await login({
        ...data,
        login: data.login.trim().toLowerCase(),
      }).unwrap();

      if (loginResult.success) {
        const sessionResult = await fetchSession().unwrap();

        if (sessionResult.success && sessionResult.data) {
          dispatch(loginUser(sessionResult.data as User));
          navigate(from, { replace: true });
        }
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  return (
    <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        className="form-input-text"
        type="text"
        label="Username / Email"
        id="loginName"
        placeholder="Username or Email..."
        {...register("login", { required: "Username/Email is required" })}
      />
      {errors.login && (
        <InputErrorContainer width="75%" errors={errors.login} />
      )}
      <TextInput
        className="form-input-text"
        type="password"
        label="Password"
        id="loginPasswd"
        placeholder="Password..."
        autoComplete="off"
        isPassword
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && (
        <InputErrorContainer width="75%" errors={errors.password} />
      )}
      <ForgotPassword />
      <LoginMessage
        isError={isError}
        error={error}
        isFetching={isFetching}
        isFetchError={isFetchError}
        fetchError={fetchError}
        isLoading={isLoading}
      />
      <Button2
        type="submit"
        className="btn2-cta"
        children="Login"
        width="75%"
        disabled={isLoading}
      />
    </form>
  );
};
