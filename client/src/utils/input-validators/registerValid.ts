export const isValidEmail = {
  validate: {
    isValid: (value: string | undefined) =>
      value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? true
        : "Invalid email",
  },
};

export const isValidUsername = {
  validate: {
    minLength: (value: string | undefined) =>
      value && value.length >= 3 ? true : "Min 3 characters on username",
    maxLength: (value: string | undefined) =>
      value && value.length <= 20 ? true : "Max 20 characters on username",
    isValid: (value: string | undefined) =>
      value && /^[a-zA-Z0-9_.-]+$/.test(value)
        ? true
        : "Only numbers, letters, and ._-",
  },
};

export const isValidPassword = {
  validate: {
    minLength: (value: string | undefined) =>
      value && value.length >= 3 ? true : "Min 8 characters",
    maxLength: (value: string | undefined) =>
      value && value.length <= 20 ? true : "Max 50 characters",
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
