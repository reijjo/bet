import express from "express";
import morgan from "morgan";
import cors from "cors";

const { TESTI } = Bun.env;

const app = express();

console.log("ENVVV", TESTI, process.env.TESTI);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
