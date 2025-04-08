import { config } from "../utils/config";
import { pgStore } from "../utils/db/db";

const { SESSION_SECRET } = config;

export const corsOptions = {
  origin: "http://localhost:5173",
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
    sameSite: "lax",
    // maxAge: 1000 * 5,
    maxAge: 1000 * 60 * 60,
  },
};
