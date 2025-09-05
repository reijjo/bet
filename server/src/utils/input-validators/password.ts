import { hasMinMaxLength } from "./inputValidators";

export const hasUppercase = (value: string): boolean => {
  const regex = /[A-Z]/;
  return regex.test(value);
};

export const hasLowercase = (value: string): boolean => {
  const regex = /[a-z]/;
  return regex.test(value);
};

export const hasNumber = (value: string): boolean => {
  const regex = /[0-9]/;
  return regex.test(value);
};

export const hasSpecialChar = (value: string): boolean => {
  const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  return regex.test(value);
};

export const isPasswordValid = (password: string, pw2?: string) => {
  if (!hasMinMaxLength(password.trim(), 8, 50)) {
    return "Password must be between 8 and 50 characters";
  }

  if (!hasUppercase(password.trim())) {
    return "Password must contain at least one uppercase letter";
  }

  if (!hasLowercase(password.trim())) {
    return "Password must contain at least one lowercase letter";
  }

  if (!hasNumber(password.trim())) {
    return "Password must contain at least one number";
  }

  if (!hasSpecialChar(password.trim())) {
    return "Password must contain at least one special character";
  }

  return "";
};
