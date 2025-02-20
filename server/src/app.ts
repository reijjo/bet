import helmet from "helmet";

import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { betRouter } from "./routes/betRoute";
import { detailsRouter } from "./routes/detailsRoute";
import { sportRouter } from "./routes/sportRoute";
import { corsOptions, sessionConfig } from "./utils/appConfig";
import cors from "cors";
import express from "express";
import session from "express-session";
// import rateLimit from "express-rate-limit";
import morgan from "morgan";

const app = express();

app.use(helmet());
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(session(sessionConfig));

app.get("/", (_req, res) => {
  res.send("hello todo");
});

app.use("/api/bets", betRouter);
app.use("/api/sports", sportRouter);
app.use("/api", detailsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
