import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  jest,
  spyOn,
  test,
} from "bun:test";

import app from "../../app";
import { initializeDatabase } from "../../models";
import { UserModel } from "../../models/userModel";
import { closeDBconnection, connectToDB } from "../../utils/db/db";
import supertest from "supertest";

const api = supertest(app);

// if (process.env.NODE_ENV === "test") {
//   console.log = function () {};
//   console.error = function () {};
// }

// beforeAll(async () => {
//   await connectToDB();
//   await initializeDatabase();
// });

// afterAll(async () => {
//   await closeDBconnection();
// });

export const createTestiukko = async () => {
  const res = await api.post("/api/users").send({
    username: "testiukko",
    password: "Testi_123",
    email: "testi@ukko.com",
  });

  expect(res.status).toBe(201);
  return res;
};

export const testiukko = {
  username: "testiukko",
  password: "Testi_123",
  email: "testi@ukko.com",
};

describe("USER CONTROLLER", () => {
  describe("getAllUsers route", () => {
    test("successfully get users", async () => {
      const res = await api.get("/api/users");

      expect(res.status).toBe(200);
    });

    test("error getting all users", async () => {
      const getAllUsersSpy = spyOn(UserModel, "findAll").mockImplementation(
        async () => {
          throw new Error("Database error");
        },
      );

      const res = await api.get("/api/users");

      expect(getAllUsersSpy).toHaveBeenCalled();
      expect(res.status).toBe(500);

      getAllUsersSpy.mockRestore();
    });
  });

  describe("findUserQuery route", () => {
    test("no user with email", async () => {
      const res = await api.get("/api/users/find?email=testi@ukko.com");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test("no user with username", async () => {
      const res = await api.get("/api/users/find?username=testiukko");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test("empty email & username", async () => {
      const res = await api.get("/api/users/find");
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid query");
    });

    test("email already registered", async () => {
      await createTestiukko();

      const res = await api.get("/api/users/find?email=testi@ukko.com");

      expect(res.status).toBe(409);
      expect(res.body.message).toBe("Email already registered");
    });

    test("username already registered", async () => {
      await createTestiukko();

      const res = await api.get("/api/users/find?username=testiukko");

      expect(res.status).toBe(409);
      expect(res.body.message).toBe("Username already registered");
    });

    test("error finding user", async () => {
      const findOneSpy = spyOn(UserModel, "findOne").mockImplementation(
        async () => {
          throw new Error("Database error");
        },
      );

      const res = await api.get("/api/users/find?email=testi@ukko.com");

      expect(findOneSpy).toHaveBeenCalled();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Database error");
      findOneSpy.mockRestore();
    });
  });

  describe("register route", () => {
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
      expect(res.body.message).toBe(
        "Username, email and password are required",
      );
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

    test("email in use", async () => {
      await createTestiukko();

      const res = await api
        .post("/api/users")
        .send({ ...testiukko, username: "newuser" });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Email already in use.");
    });

    test("username in use", async () => {
      await createTestiukko();

      const res = await api
        .post("/api/users")
        .send({ ...testiukko, email: "testi2@ukko.com" });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Username already in use.");
    });

    test("error registering user", async () => {
      const createSpy = spyOn(UserModel, "create").mockImplementation(
        async () => {
          throw new Error("Database error");
        },
      );

      const res = await api.post("/api/users").send(testiukko);

      expect(createSpy).toHaveBeenCalled();
      expect(res.status).toBe(500);

      createSpy.mockRestore();
    });
  });
});

afterEach(async () => {
  await UserModel.destroy({ where: {}, truncate: true, cascade: true });
  jest.restoreAllMocks();
});
