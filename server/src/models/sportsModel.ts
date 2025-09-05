import { sequelize } from "../utils/db/db";
import type { Sport } from "../utils/types/types";
import { DataTypes, Model } from "sequelize";

export class SportsModel extends Model<Sport> implements Sport {
  declare id: number;
  declare name: string;
}

SportsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "Sports",
  }
);
