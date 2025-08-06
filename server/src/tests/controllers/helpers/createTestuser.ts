import supertest from "supertest";
import app from "../../../app";
import type { User } from "../../../utils/types";
import { UserModel } from "../../../models/userModel";
import bcrypt from "bcryptjs";
import { UserRoles } from "../../../utils/enums";

const api = supertest(app);

export const createTestiukko = async (testiukko: Partial<User>) => {
  const res = await api.post("/api/users").send(testiukko);

  expect(res.status).toBe(201);
  return res;
};

export const createAdminukko = async (adminUkko: Partial<User>) => {
  const hashpw = await bcrypt.hash("Testi_123", 10);

  const admin = await UserModel.create({
    ...adminUkko,
    password: hashpw,
    email: adminUkko.email as string,
  });

  return admin?.dataValues;
};

export const createGuestUser = async (guestUkko: Partial<User>) => {
  const hashpw = await bcrypt.hash("Testi_123", 10);

  const guest = await UserModel.create({
    ...guestUkko,
    password: hashpw,
    email: guestUkko.email as string,
  });

  return guest?.dataValues;
};

export const loginTestiukko = async (testiukko: Partial<User>) => {
  const res = await api.post("/api/auth/login").send({
    login: testiukko.username,
    password: testiukko.password,
  });

  expect(res.body).toBe(true);
  expect(res.status).toBe(200);
  return res;
};
