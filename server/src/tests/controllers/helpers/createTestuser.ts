import supertest from "supertest";
import app from "../../../app";
import type { User } from "../../../utils/types";

const api = supertest(app);

export const createTestiukko = async (testiukko: Partial<User>) => {
  const res = await api.post("/api/users").send(testiukko);

  expect(res.status).toBe(201);
  return res;
};
