import { hasMinMaxLength } from "./inputValidators";

export const isEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isEmailValid = (email: string) => {
  if (!isEmail(email)) {
    return "Invalid email";
  }

  if (!hasMinMaxLength(email, 6, 100)) {
    return "Email must be between 6 and 100 characters";
  }

  return "";
};
