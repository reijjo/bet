import * as http from "http";

import app from "./app";
import { initializeDatabase } from "./models";
import { config } from "./utils/config";
import { connectToDB } from "./utils/db/db";
import { setupTokenCleanup } from "./utils/helperFunctions";
import { cyanBright, yellowBright } from "colorette";

const { PORT } = config;
let server = http.createServer(app);

// const restartServer = () => {
//   server.close(() => {
//     server = http.createServer(app);
//     startServer();
//   });
// };

export const startServer = async () => {
  try {
    await connectToDB();
    await initializeDatabase();

    server.listen(PORT, () => {
      console.log(yellowBright(`ENV = '${Bun.env.NODE_ENV}'`));
      console.log(
        cyanBright(
          `Server running on port ${PORT} ${String.fromCodePoint(0x1f41f)}`,
        ),
      );
    });

    setupTokenCleanup();
  } catch (error: unknown) {
    throw error;
  }
};

startServer();
