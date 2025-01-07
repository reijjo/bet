import * as http from "http";
import { cyanBright, yellowBright } from "colorette";

import app from "./app";

const { PORT } = Bun.env;

const server = http.createServer(app);

const start = async () => {
  server.listen(PORT, () => {
    console.log(yellowBright(`ENV = '${Bun.env.NODE_ENV}'`));
    console.log(cyanBright(`Server on port ${PORT}.`));
  });
};

start();