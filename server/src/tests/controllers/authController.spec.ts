import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  spyOn,
  test,
} from "bun:test";

import app from "../../app";
import { UserModel } from "../../models/userModel";

import { randomBytes } from "crypto";
import supertest from "supertest";
// import { testiukko } from "../controllers/helpers/testiukko";
// import { createTestiukko } from "../userController/helpers/createTestuser";

const api = supertest(app);

// if (process.env.NODE_ENV === "test") {
//   console.log = function () {};
//   console.error = function () {};
// }

// export const loginTestiukko = async () => {
//   const res = await api.post("/api/auth/login").send({
//     login: testiukko.username,
//     password: testiukko.password,
//   });

//   expect(res.status).toBe(200);
//   return res;
// };

describe.skip("AUTH CONTROLLER", () => {
  // describe("login route", () => {
  //   test("login successfully with email", async () => {
  //     await createTestiukko();
  //     const res = await api.post("/api/auth/login").send({
  //       login: testiukko.email,
  //       password: testiukko.password,
  //     });
  //     expect(res.status).toBe(200);
  //   });
  //   test("login successfully with username", async () => {
  //     await createTestiukko();
  //     const res = await api.post("/api/auth/login").send({
  //       login: testiukko.username,
  //       password: testiukko.password,
  //     });
  //     expect(res.status).toBe(200);
  //   });
  //   test("empty credentials", async () => {
  //     await createTestiukko();
  //     const res = await api.post("/api/auth/login").send({
  //       login: "",
  //       password: "",
  //     });
  //     expect(res.status).toBe(400);
  //     expect(res.body.message).toBe("Login and password are required");
  //   });
  //   test("user not found", async () => {
  //     const res = await api.post("/api/auth/login").send({
  //       login: "nonexistentuser",
  //       password: "password123",
  //     });
  //     expect(res.status).toBe(404);
  //     expect(res.body.message).toBe("No user found with nonexistentuser");
  //   });
  //   test("invalid password", async () => {
  //     await createTestiukko();
  //     const res = await api.post("/api/auth/login").send({
  //       login: testiukko.username,
  //       password: "wrongpassword",
  //     });
  //     expect(res.status).toBe(400);
  //     expect(res.body.message).toBe("Invalid password");
  //   });
  //   test("catch error", async () => {
  //     const loginSpy = spyOn(UserModel, "findOne").mockImplementation(
  //       async () => {
  //         throw new Error("Database error");
  //       }
  //     );
  //     const res = await api.post("/api/auth/login").send({
  //       login: "testiukko",
  //       password: "password123",
  //     });
  //     expect(res.status).toBe(500);
  //     expect(res.body.message).toBe("Failed to login. Please try again later.");
  //     loginSpy.mockRestore();
  //   });
  //   test("req.session.regenerate error", async () => {
  //     await createTestiukko();
  //     const regenerateSpy = spyOn(
  //       require("express-session").Session.prototype,
  //       "regenerate"
  //     ).mockImplementation(function (cb: (err?: Error) => void) {
  //       cb(new Error("Unexpected session error"));
  //     });
  //     const res = await api.post("/api/auth/login").send({
  //       login: testiukko.username,
  //       password: testiukko.password,
  //     });
  //     expect(res.status).toBe(500);
  //     expect(res.body.message).toBe("Failed to regenerate session");
  //     regenerateSpy.mockRestore();
  //   });
  //   test("req.session.save error", async () => {
  //     await createTestiukko();
  //     const regenerateSpy = spyOn(
  //       require("express-session").Session.prototype,
  //       "save"
  //     ).mockImplementation(function (cb: (err?: Error) => void) {
  //       cb(new Error("Unexpected session error"));
  //     });
  //     const res = await api.post("/api/auth/login").send({
  //       login: testiukko.username,
  //       password: testiukko.password,
  //     });
  //     expect(res.status).toBe(500);
  //     expect(res.body.message).toBe("Failed to save session");
  //     regenerateSpy.mockRestore();
  //   });
  // });
  // describe("logout route", () => {
  //   test("returns message if already logged out", async () => {
  //     const agent = supertest.agent(app);
  //     const res = await agent.post("/api/auth/logout");
  //     expect(res.status).toBe(200);
  //     expect(res.body.message).toBe("User already logged out");
  //   });
  //   test("logs out successfully if logged in", async () => {
  //     const agent = supertest.agent(app);
  //     await createTestiukko();
  //     await agent.post("/api/auth/login").send({
  //       login: testiukko.username,
  //       password: testiukko.password,
  //     });
  //     const res = await agent.post("/api/auth/logout");
  //     expect(res.status).toBe(200);
  //     expect(res.body.message).toBe("User logged out successfully");
  //   });
  //   test("handles session destroy error", async () => {
  //     const agent = supertest.agent(app);
  //     await createTestiukko();
  //     await agent.post("/api/auth/login").send({
  //       login: testiukko.username,
  //       password: testiukko.password,
  //     });
  //     const destroySpy = spyOn(
  //       require("express-session").Session.prototype,
  //       "destroy"
  //     ).mockImplementation(function (cb: (err?: Error) => void) {
  //       cb(new Error("Failed to destroy session"));
  //     });
  //     const res = await agent.post("/api/auth/logout");
  //     expect(res.status).toBe(500);
  //     expect(res.body.message).toBe("Failed to destroy session");
  //     destroySpy.mockRestore();
  //   });
  // });
  // describe("Am I logged in route", () => {
  //   test("logged in", async () => {
  //     await createTestiukko();
  //     const loginres = await loginTestiukko();
  //     const cookie = loginres.headers["set-cookie"];
  //     const res = await api.get("/api/auth/me").set("Cookie", cookie);
  //     expect(res.status).toBe(200);
  //     expect(res.body.success).toBe(true);
  //   });
  //   test("not logged in", async () => {
  //     const res = await api.get("/api/auth/me").set("Cookie", "");
  //     expect(res.status).toBe(401);
  //     expect(res.body.success).toBe(false);
  //     expect(res.body.message).toBe("No user session found");
  //     expect(res.body.data).toBe(null);
  //   });
  // });
  // describe("Session refresh route", () => {
  //   test("successful refresh", async () => {
  //     await createTestiukko();
  //     const loginres = await loginTestiukko();
  //     const cookie = loginres.headers["set-cookie"];
  //     const res = await api
  //       .post("/api/auth/refresh-session")
  //       .set("Cookie", cookie);
  //     expect(res.status).toBe(200);
  //   });
  //   test("session.regenerate error", async () => {
  //     await createTestiukko();
  //     const loginres = await loginTestiukko();
  //     const cookie = loginres.headers["set-cookie"];
  //     const regenerateSpy = spyOn(
  //       require("express-session").Session.prototype,
  //       "regenerate"
  //     ).mockImplementation(function (cb: (err?: Error) => void) {
  //       cb(new Error("Unexpected session error"));
  //     });
  //     const res = await api
  //       .post("/api/auth/refresh-session")
  //       .set("Cookie", cookie);
  //     expect(res.status).toBe(500);
  //     regenerateSpy.mockRestore();
  //   });
  //   test("session.save error", async () => {
  //     await createTestiukko();
  //     const loginres = await loginTestiukko();
  //     const cookie = loginres.headers["set-cookie"];
  //     const regenerateSpy = spyOn(
  //       require("express-session").Session.prototype,
  //       "save"
  //     ).mockImplementation(function (cb: (err?: Error) => void) {
  //       cb(new Error("Unexpected session error"));
  //     });
  //     const res = await api
  //       .post("/api/auth/refresh-session")
  //       .set("Cookie", cookie);
  //     expect(res.status).toBe(500);
  //     regenerateSpy.mockRestore();
  //   });
  // });
});

describe.skip("verifyAccount route", () => {
  describe("refresh token route", () => {
    test("refresh token", async () => {
      const email = "testi@ukko.com";
      const token = randomBytes(32).toString("hex");
      const tokenExpiration = new Date();
      tokenExpiration.setHours(tokenExpiration.getHours() + 1);

      await UserModel.create({
        email,
        resetToken: token,
        resetTokenExpiration: tokenExpiration,
      });

      const user = await UserModel.findOne({ where: { email } });

      if (user) {
        await user.update({
          resetToken: token,
          resetTokenExpiration: tokenExpiration,
        });

        const res = await api
          .patch(`/api/auth/register/${token}`)
          .send({ token, email });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe(
          "Token refreshed! Check your email to verify your account."
        );
        expect(res.body.data).toBe(email);
      } else {
        expect(true).toBe(false);
      }
    });

    test("refresh token catch block", async () => {
      const token = randomBytes(32).toString("hex");
      const findOneSpy = spyOn(UserModel, "findOne").mockImplementation(
        async () => {
          throw new Error("Database error");
        }
      );

      try {
        const res = await api
          .patch(`/api/auth/register/${token}`)
          .send({ token, email: "test@ukko.com" });

        expect(res.status).toBe(500);
        expect(res.body.message).toBe(
          "Failed to refresh token. Please try again later."
        );
      } finally {
        findOneSpy.mockRestore();
      }
    });
  });

  describe("finish registration route", () => {
    const registerValues = {
      email: "testi@ukko.com",
      username: "repe",
      password: "Pass_123",
    };

    beforeEach(async () => {
      const token = randomBytes(32).toString("hex");
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      await UserModel.create({
        email: "testi@ukko.com",
        resetToken: token,
        resetTokenExpiration: tomorrow,
      });
    });

    test("no email", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ email: "", password: "password", username: "username" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Username, email and password are required"
      );
    });

    test("invalid username", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ ...registerValues, username: "aaa@aaa" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid username");
    });

    test("too short username", async () => {
      const res = await api.patch("/api/auth/register/").send({
        ...registerValues,
        username: "a",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Username must be between 3 and 20 characters"
      );
    });

    test("too short password", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ ...registerValues, password: "passwor" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Password must be between 8 and 50 characters"
      );
    });

    test("password no uppercase", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ ...registerValues, password: "password" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Password must contain at least one uppercase letter"
      );
    });

    test("password no lowercase", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ ...registerValues, password: "PASSWORD" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Password must contain at least one lowercase letter"
      );
    });

    test("password no number", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ ...registerValues, password: "Password" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Password must contain at least one number"
      );
    });

    test("password no special char", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ ...registerValues, password: "Password123" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Password must contain at least one special character"
      );
    });

    test("user not found", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ ...registerValues, email: "huru@ukko.com" });
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("User not found");
    });

    test("finishing registering", async () => {
      const res = await api.patch("/api/auth/register/").send(registerValues);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe(
        `User ${registerValues.username} created successfully!`
      );
    });

    test("finishing registering catch block", async () => {
      const findOneSpy = spyOn(UserModel, "findOne").mockImplementation(
        async () => {
          throw new Error("Database error");
        }
      );

      try {
        const res = await api.patch(`/api/auth/register`).send(registerValues);

        expect(res.status).toBe(500);
        expect(res.body.message).toBe(
          "Failed to finish registration. Please try again later."
        );
      } finally {
        findOneSpy.mockRestore();
      }
    });
  });
});

afterEach(async () => {
  await UserModel.destroy({ where: {}, truncate: true, cascade: true });
  jest.restoreAllMocks();
});
