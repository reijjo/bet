import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  publicDir: "public",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      clean: true,
      exclude: [
        "**/*.spec.{ts,tsx}",
        "**/*.test.{ts,tsx}",
        "**/dist/**",
        "**/vite.config.ts",
        "**/.eslintrc.cjs",
        "**mockdata/**",
        "**/*.d.ts",
        "**/index.{ts,tsx}",
        "**/tests/**",
      ],
    },
  },
});
