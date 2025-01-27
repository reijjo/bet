import { sequelize } from "../utils/db/db";
import { DataTypes, Model } from "sequelize";

export class SportsModel extends Model {}

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
  },
);
