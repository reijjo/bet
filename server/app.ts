import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/usersRoute";

const { TESTI } = Bun.env;

const app = express();

console.log("ENVVV", TESTI, process.env.TESTI);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);

export default app;
