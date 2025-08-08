import { hasMinMaxLength } from "./inputValidators";

export const isNameValid = (name: string) => {
  if (!hasMinMaxLength(name, 3, 50)) {
    return "Name must be between 3 and 50 characters";
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return "Name can only contain letters and spaces";
  }

  return "";
};

export const isFeedbackMessageValid = (message: string) => {
  if (!hasMinMaxLength(message, 5, 1000)) {
    return "Message must be between 5 and 1000 characters";
  }

  return "";
};
