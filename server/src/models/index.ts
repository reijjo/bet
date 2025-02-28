import { sequelize } from "../utils/db/db";
import { BetDetailsModel } from "./betDetailModel";
import { BetModel } from "./betModel";
import { UserModel } from "./userModel.ts";
import { blueBright } from "colorette";

BetModel.hasMany(BetDetailsModel, {
  foreignKey: "bet_id",
  onDelete: "CASCADE",
  as: "betDetails",
});

BetDetailsModel.belongsTo(BetModel, {
  foreignKey: "bet_id",
  as: "bet",
});

UserModel.hasMany(BetModel, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  as: "bets",
});

BetModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});

// Sync models with database
const syncDatabase = async () => {
  try {
    // In development, you might want to use:
    await sequelize.sync({ alter: true }); // This updates existing tables
    // Or for complete reset:
    // await sequelize.sync({ force: true }); // WARNING: This drops all tables

    console.log(blueBright("Database synchronized successfully."));
  } catch (error: unknown) {
    console.error("Error synchronizing database:", error);
    process.exit(1); // Exit if sync fails
  }
};

// Export a function to initialize the database
export const initializeDatabase = async () => {
  await syncDatabase();
};

export { BetModel, BetDetailsModel };
