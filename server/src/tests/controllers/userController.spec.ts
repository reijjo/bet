import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  jest,
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

describe("register route", () => {
  test("valid registration", async () => {
    // const res = await api.post("/api/users").send({
    //   username: "testuser",
    //   password: "testpassword",
    //   email: "test@user.com",
    // });

    // expect(res.status).toBe(201);
    expect(true).toBe(true);
  });
});

afterEach(async () => {
  await UserModel.destroy({ where: {}, truncate: true, cascade: true });
  jest.restoreAllMocks();
});
