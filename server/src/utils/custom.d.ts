import "express-session";
import type { UserModel } from "../models/userModel";

declare module "express-session" {
  interface SessionData {
    user?: { id: number; username: string; email: string; role: string };
  }
}

declare global {
  namespace Express {
    interface Request {
      userFromToken?: InstanceType<typeof UserModel>;
    }
  }
}
