import { mockUser } from "../userMock";

export const verifyQueryResponse = {
  data: mockUser,
  success: true,
  message: "Account verified successfully.",
};

export const updateUserMutationResponse = {
  data: mockUser,
  success: true,
  message: "User updated",
};
