import { UserRoles } from "../../utils/enums";

export const mockUser = {
  username: "test",
  password: "Test_123",
  email: "testi@ukko.com",
  role: UserRoles.Guest,
  resetToken: "testtoken12345",
  resetTokenExpiration: new Date().toISOString(),
};

export const mockUserWithId = {
  ...mockUser,
  id: 1,
  role: UserRoles.User,
};
