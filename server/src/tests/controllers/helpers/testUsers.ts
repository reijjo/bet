import { UserRoles } from "../../../utils/types/enums";

export const testiukko = {
  username: "testiukko",
  password: "Testi_123",
  email: "testi@ukko.com",
  role: UserRoles.Registered,
  resetToken: "validtoken123",
  resetTokenExpiration: new Date(Date.now() + 1000 * 60 * 60),
};

export const adminUkko = {
  username: "adminukko",
  password: "Testi_123",
  email: "testi@ukko.com",
  role: UserRoles.Admin,
  resetToken: "validtoken123",
  resetTokenExpiration: new Date(Date.now() + 1000 * 60 * 60),
};

export const guestUkko = {
  username: "guestukko",
  password: "Testi_123",
  email: "testi@ukko.com",
  role: UserRoles.Guest,
  resetToken: "validtoken123",
  resetTokenExpiration: new Date(Date.now() + 1000 * 60 * 60),
};
