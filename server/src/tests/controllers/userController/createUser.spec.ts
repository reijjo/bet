import { describe, test, expect, afterEach, jest, spyOn } from "bun:test";
import { UserModel } from "../../../models/userModel";
import supertest from "supertest";
import app from "../../../app";
import { testiukko } from "./helpers/testUsers";
import { createTestiukko } from "./helpers/createTestuser";
import * as emailModule from "../../../controllers/utils/createUserUtils";

if (process.env.NODE_ENV === "test") {
  console.log = function () {};
  console.error = function () {};
}

const api = supertest(app);

describe("USER CONTROLLER - createUser", () => {
  afterEach(async () => {
    await UserModel.destroy({ where: {}, truncate: true, cascade: true });
    jest.restoreAllMocks();
  });

  test("valid registration", async () => {
    const res = await createTestiukko();
    expect(res.status).toBe(201);
  });

  test("missing username", async () => {
    const res = await api.post("/api/users").send({
      email: "testi@ukko.com",
      password: "Testi_123",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Username, email and password are required");
  });

  test("invalid username", async () => {
    const res = await api
      .post("/api/users")
      .send({ ...testiukko, username: "aaa@aaa" });
    expect(res.status).toBe(400);
  });

  test("invalid email", async () => {
    const res = await api
      .post("/api/users")
      .send({ ...testiukko, email: "aaa@" });
    expect(res.status).toBe(400);
  });

  test("invalid password", async () => {
    const res = await api
      .post("/api/users")
      .send({ ...testiukko, password: "aaa" });
    expect(res.status).toBe(400);
  });

  test("invalid password - no uppercase", async () => {
    const res = await api
      .post("/api/users")
      .send({ ...testiukko, password: "salasana123!" });
    expect(res.status).toBe(400);
  });

  test("invalid password - no lowercase", async () => {
    const res = await api
      .post("/api/users")
      .send({ ...testiukko, password: "SALASANA123!" });
    expect(res.status).toBe(400);
  });

  test("invalid password - no number", async () => {
    const res = await api
      .post("/api/users")
      .send({ ...testiukko, password: "Salasana!" });
    expect(res.status).toBe(400);
  });

  test("email in use", async () => {
    await createTestiukko();

    const res = await api
      .post("/api/users")
      .send({ ...testiukko, username: "newuser" });

    expect(res.status).toBe(409);
    expect(res.body.message).toBe("Email already in use.");
  });

  test("username in use", async () => {
    await createTestiukko();

    const res = await api
      .post("/api/users")
      .send({ ...testiukko, email: "testi2@ukko.com" });

    expect(res.status).toBe(409);
    expect(res.body.message).toBe("Username already in use.");
  });

  test("error registering user", async () => {
    const createSpy = spyOn(UserModel, "create").mockImplementation(
      async () => {
        throw new Error("Database error");
      }
    );

    const res = await api.post("/api/users").send(testiukko);

    expect(createSpy).toHaveBeenCalled();
    expect(res.status).toBe(500);

    createSpy.mockRestore();
  });

  test("sendVerificationEmail catches and re-throws errors", async () => {
    const transporterSpy = spyOn(
      emailModule.transporter,
      "sendMail"
    ).mockImplementation(async () => {
      throw new Error("Network error");
    });

    await expect(
      emailModule.sendVerificationEmail("test@example.com", "test-token")
    ).rejects.toThrow("Network error");

    expect(transporterSpy).toHaveBeenCalled();
    transporterSpy.mockRestore();
  });
});
