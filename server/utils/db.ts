import { Sequelize } from "sequelize";
import chalk from "chalk";

const { POSTGRES_URL } = Bun.env;

export const sequelize = new Sequelize(String(POSTGRES_URL));

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(chalk.yellowBright("Connected to database."));
  } catch (error: unknown) {
    console.log("Error connecting to database: ", error);
    return process.exit(1);
  }
  return null;
};
