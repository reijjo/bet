import { describe, test, expect, spyOn } from "bun:test";
import supertest from "supertest";
import app from "../../../app";
import { UserModel } from "../../../models/userModel";

const api = supertest(app);

describe("USER CONTROLLER - getAllUsers", () => {
  test("successfully get users", async () => {
    const res = await api.get("/api/users");

    expect(res.status).toBe(200);
  });

  test("error getting all users", async () => {
    const getAllUsersSpy = spyOn(UserModel, "findAll").mockImplementation(
      async () => {
        throw new Error("Database error");
      }
    );

    const res = await api.get("/api/users");

    expect(getAllUsersSpy).toHaveBeenCalled();
    expect(res.status).toBe(500);

    getAllUsersSpy.mockRestore();
  });
});
