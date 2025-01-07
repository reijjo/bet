import * as http from "http";
import { cyanBright, yellowBright, redBright } from "colorette";
import app from "./app";

const PORT = Bun.env.PORT || 3000;
let server = http.createServer(app);

const restartServer = () => {
  server.close(() => {
    server = http.createServer(app);
    startServer();
  });
};

// Error handlers
process.on("uncaughtException", (err) => {
  console.error(redBright("UNCAUGHT EXCEPTION! Restarting..."));
  console.error(err);
  restartServer();
});

process.on("unhandledRejection", (err) => {
  console.error(redBright("UNHANDLED REJECTION! Restarting..."));
  console.error(err);
  restartServer();
});

const startServer = async () => {
  try {
    server.listen(PORT, () => {
      console.log(yellowBright(`ENV = '${Bun.env.NODE_ENV}'`));
      console.log(cyanBright(`Server running on port ${PORT}`));
    });
  } catch (error) {
    console.error(redBright("Error starting server:"), error);
    setTimeout(startServer, 5000);
  }
};

startServer();