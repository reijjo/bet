import { afterAll, beforeAll } from "bun:test";

import { initializeDatabase } from "../models";
import { closeDBconnection, connectToDB } from "../utils/db/db";

beforeAll(async () => {
  await connectToDB();
  await initializeDatabase();
});

afterAll(async () => {
  await closeDBconnection();
});
