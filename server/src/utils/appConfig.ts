import { config } from "../utils/config";
import { pgStore } from "../utils/db/db";

const { SESSION_SECRET } = config;

export const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://blue-mud-099cac403.6.azurestaticapps.net",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export const sessionConfig = {
  store: pgStore,
  secret: SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: Bun.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 1000 * 60 * 70,
  },
};
