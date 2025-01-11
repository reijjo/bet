import * as http from "http";
import { cyanBright, yellowBright, redBright } from "colorette";
import app from "./app";
import { connectToDB } from "./utils/db/db";
import { config } from "./utils/config";
import { initializeDatabase } from "./models";

const { PORT } = config
let server = http.createServer(app);

// const restartServer = () => {
//   server.close(() => {
//     server = http.createServer(app);
//     startServer();
//   });
// };

const startServer = async () => {
	try {
		await connectToDB()
		await initializeDatabase();

    server.listen(PORT, () => {
      console.log(yellowBright(`ENV = '${Bun.env.NODE_ENV}'`));
      console.log(cyanBright(`Server running on port ${PORT} ${String.fromCodePoint(0x1F41F)}`));
    });
  } catch (error: unknown) {
		throw error
  }
};

startServer();