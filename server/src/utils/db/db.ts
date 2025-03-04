import { initializeDatabase } from "../../models";
import { config } from "../config";
import { blueBright, redBright } from "colorette";
import PgSession from "connect-pg-simple";
import session from "express-session";
import pg from "pg";
import { ConnectionRefusedError, Sequelize } from "sequelize";

const { DATABASE_URL } = config;

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
  dialectOptions: {
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

export const pgStore = new (PgSession(session))({
  pool: new pg.Pool({ connectionString: DATABASE_URL }),
  tableName: "sessions",
});
