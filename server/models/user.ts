import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

class User extends Model {}

const userInitOptions = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};

User.init(userInitOptions, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: "user",
});

export default User;
