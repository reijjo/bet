import { hasMinMaxLength, sanitazeValue } from "./inputValidators";

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

export const isPasswordValid = (password: string) => {
  if (!hasMinMaxLength(sanitazeValue(password), 8, 50)) {
    return "Password must be between 8 and 50 characters";
  }

  if (!hasUppercase(sanitazeValue(password))) {
    return "Password must contain at least one uppercase letter";
  }

  if (!hasLowercase(sanitazeValue(password))) {
    return "Password must contain at least one lowercase letter";
  }

  if (!hasNumber(sanitazeValue(password))) {
    return "Password must contain at least one number";
  }

  if (!hasSpecialChar(sanitazeValue(password))) {
    return "Password must contain at least one special character";
  }

  return "";
};
