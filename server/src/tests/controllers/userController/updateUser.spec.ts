import { describe, test, expect, afterEach, jest, spyOn } from "bun:test";
import supertest from "supertest";
import app from "../../../app";
import { UserModel } from "../../../models/userModel";
import { createTestiukko } from "../helpers/createTestuser";
import { testiukko } from "../helpers/testUsers";

const api = supertest(app);

describe("USER CONTROLLER - updateUser", () => {
  afterEach(async () => {
    await UserModel.destroy({ where: {}, truncate: true, cascade: true });
    jest.restoreAllMocks();
  });

  test("valid update", async () => {
    const user = await createTestiukko(testiukko);
    const updateData = { username: "testiukko2" };

    const res = await api
      .patch(`/api/users/${user.body.data.id}`)
      .send(updateData);

    expect(res.status).toBe(200);
    expect(res.body.data.username).toBe(updateData.username);
  });

  describe("error cases", () => {
    test("no update data", async () => {
      const user = await createTestiukko(testiukko);

      const res = await api.patch(`/api/users/${user.body.data.id}`).send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("No update fields provided");
    });

    test("user not found", async () => {
      const res = await api
        .patch("/api/users/999")
        .send({ username: "testiukko2" });
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("User not found");
    });

    test("catch block", async () => {
      const user = await createTestiukko(testiukko);
      const updateData = { username: "testiukko2" };

      const spy = spyOn(UserModel, "findByPk").mockImplementation(() => {
        throw new Error("Database error");
      });

      const res = await api
        .patch(`/api/users/${user.body.data.id}`)
        .send(updateData);

      expect(spy).toHaveBeenCalled();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to update user");

      spy.mockRestore();
    });
  });
});
