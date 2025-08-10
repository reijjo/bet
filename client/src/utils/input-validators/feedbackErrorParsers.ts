export const parseServerErrorToFieldErrors = (
  errorMessage: string
): { [key: string]: string } => {
  const fieldErrors: { [key: string]: string } = {};

  // Check if the error relates to a specific field
  if (
    errorMessage.includes("Name must be between") ||
    errorMessage.includes("Name can only contain")
  ) {
    fieldErrors.name = errorMessage;
  } else if (
    errorMessage.includes("Invalid email") ||
    errorMessage.includes("Email must be between")
  ) {
    fieldErrors.email = errorMessage;
  } else if (errorMessage.includes("Message must be between")) {
    fieldErrors.message = errorMessage;
  } else {
    // For generic server errors, show on name field as fallback
    fieldErrors.server = errorMessage;
  }

  return fieldErrors;
};
