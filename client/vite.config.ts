import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  publicDir: "public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
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
        "**/src/main.tsx",
      ],
    },
  },
});
