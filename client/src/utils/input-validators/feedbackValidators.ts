import { FeedbackMessage } from "../types";

export const validateFeedbackName = (name: string): string | null => {
  if (!name.trim()) {
    return "Name is required";
  }

  if (name.trim().length < 3 || name.trim().length > 50) {
    return "Name must be between 3 and 50 characters";
  }

  if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    return "Name can only contain letters and spaces";
  }

  return null;
};

export const validateFeedbackEmail = (email?: string): string | null => {
  // Email is optional, so if it's empty or undefined, it's valid
  if (!email || email.trim().length === 0) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return "Invalid email";
  }

  if (email.trim().length < 6 || email.trim().length > 100) {
    return "Email must be between 6 and 100 characters";
  }

  return null;
};

export const validateFeedbackMessage = (message: string): string | null => {
  if (!message.trim()) {
    return "Message is required";
  }

  if (message.trim().length < 5 || message.trim().length > 1000) {
    return "Message must be between 5 and 1000 characters";
  }

  return null;
};

export const validateAllFeedbackFields = (
  feedback: FeedbackMessage
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  const nameError = validateFeedbackName(feedback.name);
  if (nameError) {
    errors.name = nameError;
  }

  const emailError = validateFeedbackEmail(feedback.email);
  if (emailError) {
    errors.email = emailError;
  }

  const messageError = validateFeedbackMessage(feedback.message);
  if (messageError) {
    errors.message = messageError;
  }

  return errors;
};
