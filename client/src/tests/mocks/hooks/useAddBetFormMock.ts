import { vi } from "vitest";

import { mockBetDetail } from "../betDetailMock";

export const mockUseAddBetForm = {
  modifyIndex: null,
  setModifyIndex: vi.fn(),
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
  handleSelectChange: vi.fn(),
};
