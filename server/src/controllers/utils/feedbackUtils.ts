import { isEmailValid } from "../../utils/input-validators/email";
import {
  isFeedbackMessageValid,
  isNameValid,
} from "../../utils/input-validators/feedback";

export const isFeedbackValid = (
  name: string,
  message: string,
  email: string
): string | null => {
  const nameValidation = isNameValid(name);
  if (nameValidation) {
    return nameValidation;
  }

  if (email.length > 0) {
    const emailValidation = isEmailValid(String(email));
    if (emailValidation) {
      return emailValidation;
    }
  }

  const feedbackMessageValidation = isFeedbackMessageValid(message);

  if (feedbackMessageValidation) {
    return isFeedbackMessageValid(message);
  }

  return null;
};
