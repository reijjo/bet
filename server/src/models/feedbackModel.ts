import { sequelize } from "../utils/db/db";
import type { FeedbackMessageAdmin } from "../utils/types/types";
import { DataTypes, Model, type Optional } from "sequelize";

export interface FeedbackCreation
  extends Optional<
    FeedbackMessageAdmin,
    "id" | "readByAdmin" | "responded" | "responseText"
  > {}

class FeedbackModel
  extends Model<FeedbackMessageAdmin, FeedbackCreation>
  implements FeedbackMessageAdmin
{
  declare id?: number;
  declare name: string;
  declare email: string;
  declare message: string;
  declare readByAdmin: boolean;
  declare responded: boolean;
  declare responseText?: string;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

FeedbackModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    readByAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    responded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    responseText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "Feedback",
    tableName: "feedback",
  }
);

export { FeedbackModel };
