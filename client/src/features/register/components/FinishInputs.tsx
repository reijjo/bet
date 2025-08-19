import "./RegisterForm.css";

import { InputErrorContainer, TextInput } from "../../../components";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { RegisterValues } from "../../../utils/types";
import {
  isValidPassword,
  isValidUsername,
} from "../../../utils/input-validators/registerValid";
import { Fragment } from "react/jsx-runtime";

interface FinishInputsProps {
  register: UseFormRegister<RegisterValues>;
  watch: UseFormWatch<RegisterValues>;
  errors: FieldErrors<RegisterValues>;
}

export const FinishInputs = ({
  register,
  watch,
  errors,
}: FinishInputsProps) => {
  const passwordMatcher = watch("password");

  const inputs = [
    {
      id: 1,
      type: "text",
      label: "Username",
      placeholder: "Username",
      required: true,
      registerProps: register("username", isValidUsername),
      error: errors.username,
      errorField: "Username",
    },
    {
      id: 2,
      type: "password",
      label: "Password",
      placeholder: "Password",
      required: true,
      isPassword: true,
      registerProps: register("password", isValidPassword),
      error: errors.password,
      errorField: "Password",
    },
    {
      id: 3,
      type: "password",
      label: "Confirm password",
      placeholder: "Confirm Password",
      required: true,
      isPassword: true,
      registerProps: register("password2", {
        validate: (value) =>
          value === passwordMatcher || "Passwords don't match",
      }),
      error: errors.password2,
    },
  ];

  return (
    <>
      {inputs.map((input) => (
        <Fragment key={input.id}>
          <TextInput
            className="register-form-input-text"
            type={input.type}
            label={input.label}
            id={input.id.toString()}
            placeholder={input.placeholder}
            required={input.required}
            isPassword={input.isPassword}
            {...input.registerProps}
          />
          {input.error && (
            <InputErrorContainer
              errors={input.error?.types || {}}
              field={input.errorField}
            />
          )}
        </Fragment>
      ))}
    </>
  );
};
