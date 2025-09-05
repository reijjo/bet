import { sequelize } from "../utils/db/db";
import { UserRoles, type UserRolesType } from "../utils/types/enums";
import type { User } from "../utils/types/types";
import { DataTypes, Model, type Optional } from "sequelize";

export interface UserCreation
  extends Optional<User, "id" | "username" | "password" | "role"> {}

class UserModel extends Model<User, UserCreation> implements User {
  declare id: number;
  declare email: string;
  declare username?: string;
  declare password?: string;
  declare role: UserRolesType;
  declare resetToken?: string;
  declare resetTokenExpiration?: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRoles)),
      allowNull: false,
      defaultValue: UserRoles.Registered,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "User",
  }
);

export { UserModel };
