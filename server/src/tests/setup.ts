import { afterAll, beforeAll } from "bun:test";

import { initializeDatabase } from "../models";
import { closeDBconnection, connectToDB } from "../utils/db/db";

beforeAll(async () => {
  await connectToDB();
  await initializeDatabase();
});

afterAll(async () => {
  console.log("Starting cleanup...");
  console.log("environment:", process.env);
  console.log("Node env:", process.env.NODE_ENV);
  console.log("Bun env:", Bun.env.NODE_ENV);

  await new Promise((resolve) => setTimeout(resolve, 500));
  await closeDBconnection();

  console.log("Cleanup completed");
});
