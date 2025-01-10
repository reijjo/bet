import * as http from "http";
import { cyanBright, yellowBright, redBright } from "colorette";
import app from "./app";
import { connectToDB } from "./utils/db/db";
import { config } from "./utils/config";

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
    server.listen(PORT, () => {
      console.log(yellowBright(`ENV = '${Bun.env.NODE_ENV}'`));
      console.log(cyanBright(`Server running on port ${PORT}`));
    });
  } catch (error: unknown) {
		throw error
  }
};

startServer();