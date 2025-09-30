import * as http from "http";

import app from "./app";
import { initializeDatabase } from "./models";
import { config } from "./utils/config";
import { connectToDB } from "./utils/db/db";
import { cyanBright, yellowBright } from "colorette";

const { PORT } = config;
// const isProduction =
//   Bun.env.NODE_ENV === "production" || process.env.NODE_ENV === "production";

let server = http.createServer(app);
// const restartServer = () => {
//   server.close(() => {
//     server = http.createServer(app);
//     startServer(0);
//   });
// };

export const startServer = async () => {
  try {
    await connectToDB();
    await initializeDatabase();

    server.listen(Number(PORT), "0.0.0.0", () => {
      console.log(yellowBright(`ENV = '${Bun.env.NODE_ENV}'`));
      console.log(
        cyanBright(
          `Server running on port ${PORT} ${String.fromCodePoint(0x1f41f)}`
        )
      );
    });

    // setupTokenCleanup();
  } catch (error: unknown) {
    throw error;
  }
};

startServer();
