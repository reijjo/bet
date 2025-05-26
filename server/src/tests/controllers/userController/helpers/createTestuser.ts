import supertest from "supertest";
import app from "../../../../app";

const api = supertest(app);

export const createTestiukko = async () => {
  const res = await api.post("/api/users").send({
    username: "testiukko",
    password: "Testi_123",
    email: "testi@ukko.com",
  });

  expect(res.status).toBe(201);
  return res;
};
