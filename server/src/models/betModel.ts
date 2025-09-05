import { sequelize } from "../utils/db/db";
import {
  BetStatus,
  BetType,
  Bookmaker,
  SportLeague,
} from "../utils/types/enums";
import type { Bet } from "../utils/types/types";
import { DataTypes, Model, type Optional } from "sequelize";

export interface BetCreation extends Optional<Bet, "id"> {}

export class BetModel extends Model<Bet, BetCreation> implements Bet {
  declare id: number;
  declare user_id: number;
  declare stake: number;
  declare bookmaker: Bookmaker;
  declare tipper?: string;
  declare status: BetStatus;
  declare bet_final_odds: number;
  declare bet_final_type: BetType;
  declare notes?: string;
}

BetModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    stake: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    bookmaker: {
      type: DataTypes.ENUM(...Object.values(Bookmaker)),
      allowNull: false,
    },
    tipper: {
      type: DataTypes.STRING,
    },
    sport: {
      type: DataTypes.ENUM(...Object.values(SportLeague)),
      allowNull: false,
      defaultValue: SportLeague.NBA,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(BetStatus)),
      allowNull: false,
    },
    bet_final_type: {
      type: DataTypes.ENUM(...Object.values(BetType)),
      allowNull: false,
    },
    bet_final_odds: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "Bet",
  }
);
