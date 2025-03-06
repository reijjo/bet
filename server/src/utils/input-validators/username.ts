import { hasMinMaxLength, sanitazeValue } from "./inputValidators";

export const isUsername = (username: string): boolean => {
  const regex = /^[a-zA-Z0-9_.-]+$/;
  return regex.test(username);
};

export const isUsernameValid = (username: string) => {
  if (!hasMinMaxLength(sanitazeValue(username), 3, 20)) {
    return "Username must be between 3 and 20 characters";
  }

  if (!isUsername(sanitazeValue(username))) {
    return "Invalid username";
  }

  return "";
};
