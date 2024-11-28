import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

export const resizeWindow = (width: number) => {
  global.innerWidth = width;
  global.dispatchEvent(new Event("resize"));
};

afterEach(() => {
  cleanup();
});
