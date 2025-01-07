import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet())
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.send("hello todo");
});

export default app;