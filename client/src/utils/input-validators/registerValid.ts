export const isValidUsername = {
  minLength: {
    value: 3,
    message: "Min 3 characters on username",
  },
  maxLength: {
    value: 20,
    message: "Max 20 characters on username",
  },
  pattern: {
    value: /^[a-zA-Z0-9_.-]+$/,
    message: "Only letters, numbers and _-. allowed",
  },
};

export const isValidPassword = {
  minLength: {
    value: 8,
    message: "Min 8 characters",
  },
  maxLength: {
    value: 50,
    message: "Max 50 characters",
  },
  validate: {
    hasUppercase: (value: string | undefined) =>
      value && /[A-Z]/.test(value) ? true : "One uppercase letter",
    hasLowercase: (value: string | undefined) =>
      value && /[a-z]/.test(value) ? true : "One lowercase letter",
    hasNumber: (value: string | undefined) =>
      value && /[0-9]/.test(value) ? true : "One number",
    hasSpecialChar: (value: string | undefined) =>
      value && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
        ? true
        : "One special character ([!@#$%&*()_-=[]{};:\\|,.<>/?])",
  },
};
