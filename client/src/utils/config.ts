const { VITE_BACKEND_URL, VITE_DEPLOYMENT_URL } = import.meta.env;

export const config = {
  BACKEND_URL:
    process.env.NODE_ENV !== "dev" && process.env.NODE_ENV !== "test"
      ? VITE_DEPLOYMENT_URL
      : VITE_BACKEND_URL,
};
