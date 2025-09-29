import * as http from "http";
import * as httsp from "https";
import * as fs from "fs";

import app from "./app";
import { initializeDatabase } from "./models";
import { config } from "./utils/config";
import { connectToDB } from "./utils/db/db";
import { cyanBright, yellowBright } from "colorette";

const { PORT } = config;
let server: http.Server | httsp.Server;

if (
  Bun.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "production"
) {
  const httpsOptions = {
    key: fs.readFileSync("/etc/pki/tls/private/localhost.key"),
    cert: fs.readFileSync("/etc/pki/tls/certs/localhost.crt"),
  };
  server = httsp.createServer(httpsOptions, app);
} else {
  server = http.createServer(app);
}

// const restartServer = () => {
//   server.close(() => {
//     server = http.createServer(app);
//     startServer(0);
//   });
// };

const isDeployedPORT =
  Bun.env.NODE_ENV === "production" || process.env.NODE_ENV === "production"
    ? 80
    : PORT;

export const startServer = async () => {
  try {
    await connectToDB();
    await initializeDatabase();

    server.listen(isDeployedPORT, () => {
      console.log(yellowBright(`ENV = '${Bun.env.NODE_ENV}'`));
      console.log(
        cyanBright(
          `Server running on port ${isDeployedPORT} ${String.fromCodePoint(0x1f41f)}`
        )
      );
    });

    // setupTokenCleanup();
  } catch (error: unknown) {
    throw error;
  }
};

startServer();
