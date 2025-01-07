import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

const app = express();

const corsOptions = {
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
	credentials: true,
	optionsSuccessStatus: 200
}

app.use(helmet())
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (_req, res) => {
  res.send("hello todo");
});

export default app;