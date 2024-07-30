import * as http from "http";
import app from "./app";
import chalk from "chalk";

import { connectToDB } from "./utils/db";

const { PORT } = Bun.env;

const server = http.createServer(app);

const start = async () => {
  await connectToDB();

  server.listen(PORT, () => {
    console.log(chalk.magentaBright(`ENV = '${Bun.env.NODE_ENV}'`));
    console.log(chalk.yellowBright(`Server running on port ${PORT}!`));
    console.log("-------------------");
  });
};

start();
