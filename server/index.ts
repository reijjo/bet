import * as http from "http";
import app from "./app";
import chalk from "chalk";

const { PORT } = Bun.env;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("-------------------");
  console.log(chalk.magentaBright(`ENV = '${Bun.env.NODE_ENV}'`));
  console.log(chalk.cyanBright(`Server running on port ${PORT}!`));
  console.log("-------------------");
});
