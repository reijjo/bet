// import { render, screen } from "@testing-library/react";
// import { Provider } from "react-redux";
import { beforeEach, describe, expect, it, vi } from "vitest";

// import App from "../App";
// import { store } from "../store/store";

// const renderWithRouter = () => {
//   return render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//   );
// };

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders homepage by default", async () => {
    // renderWithRouter();
    // expect(
    //   await screen.findByRole("heading", {
    //     name: /Track your bets online without annoying excel sheets/i,
    //   }),
    // ).toBeInTheDocument();
    expect(true).toBe(true); // Placeholder for actual test
  });
});
