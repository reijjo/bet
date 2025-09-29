import { config } from "../utils/config";
import { pgStore } from "../utils/db/db";
import { SESSION_LENGTH } from "./defaults";

const { SESSION_SECRET, AWS_EC2 } = config;

export const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://blue-mud-099cac403.6.azurestaticapps.net",
    "https://tarpit.pages.dev",
    AWS_EC2,
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200,
};

const isSamesite =
  Bun.env.NODE_ENV === "production" || process.env.NODE_ENV === "production";

export const sessionConfig = {
  store: pgStore,
  secret: SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isSamesite,
    sameSite: isSamesite ? ("none" as const) : ("lax" as const),
    maxAge: SESSION_LENGTH,
  },
};
