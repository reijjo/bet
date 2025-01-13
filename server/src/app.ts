import helmet from "helmet";

import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { betRouter } from "./routes/betRoute";
import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (_req, res) => {
  res.send("hello todo");
});

app.use("/api/bets", betRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
