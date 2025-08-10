import { config } from "../config";
import { blueBright, redBright } from "colorette";
import PgSession from "connect-pg-simple";
import session from "express-session";
import { ConnectionRefusedError, Sequelize } from "sequelize";

const { DATABASE_URL } = config;
const isProduction =
  Bun.env.NODE_ENV === "production" || process.env.NODE_ENV === "production";

export const sequelize = new Sequelize(DATABASE_URL, {
  retry: {
    max: 3,
    timeout: 3000,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialect: "postgres",
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        connectTimeout: 60000, // Increased timeout
      }
    : {
        connectTimeout: 10000,
      },
  logging: false,
});

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(blueBright("Connected to database."));
  } catch (error: unknown) {
    if (error instanceof ConnectionRefusedError) {
      console.error(redBright("Database connection refused!"));
      console.log(blueBright("Check that database is running."));
    } else {
      console.error(redBright("Unexpected error during startup: "), error);
    }
    process.exit(1);
  }
};

export const closeDBconnection = async () => {
  try {
    await sequelize.close();
    console.log(blueBright("Database connection closed."));
  } catch (error: unknown) {
    console.error(redBright("Error closing database connection: "), error);
  }
};

// Use connection string approach for sessions
export const pgStore = new (PgSession(session))({
  conString: DATABASE_URL,
  tableName: "sessions",
  createTableIfMissing: true,
});
