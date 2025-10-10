import { vi } from "vitest";

import { mockBetDetail } from "../betDetailMock";

export const mockUseAddBetForm = {
  modifyId: null,
  setModifyId: vi.fn(),
  handleModifyBet: vi.fn(),
  myBet: {
    betDetails: [],
  },
  setMyBet: vi.fn(),
  addBetDetails: mockBetDetail,
  setAddBetDetails: vi.fn(),
  errors: {},
  setErrors: vi.fn(),
  handleBetInput: vi.fn(),
  handleDetailsSelect: vi.fn(),
  handleBlur: vi.fn(),
  handleFocus: vi.fn(),
};
