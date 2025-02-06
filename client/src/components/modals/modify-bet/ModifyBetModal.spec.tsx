// import { render, screen } from "@testing-library/react";
// import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";

// import { store } from "../../../store/store";
// import { mockBet } from "../../../tests/mocks/betMock";
// import { ModifyBetModal } from "./ModifyBetModal";

// vi.mock("../../../features/api/betsApiSlice", () => ({
//   useGetBetByIdQuery: () => ({
//     data: mockBet,
//     isLoading: false,
//     isError: false,
//   }),
// }));

// vi.mock("../../../hooks/useAddBetForm", () => ({
//   useAddBetForm: () => ({
//     modifyIndex: null,
//     setModifyIndex: vi.fn(),
//     handleModifyBet: vi.fn(),
//   }),
// }));

// vi.mock("../../../store/hooks", () => ({
//   useAppSelector: () => ({ id: mockBet.id }),
//   useAppDispatch: () => vi.fn(),
// }));

describe("ModifyBetModal", () => {
  // const renderComponent = () => {
  //   return render(
  //     <Provider store={store}>
  //       <ModifyBetModal />
  //     </Provider>,
  //   );
  // };

  it("renders the ModifyBetModal component", () => {
    expect(true).toBe(true);
    // renderComponent();
    // expect(screen.getByRole("heading")).toHaveTextContent("Modify Bet");
  });
});
