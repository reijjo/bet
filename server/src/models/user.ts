import { Model } from "sequelize";
import { sequelize } from "../utils/db/db";

class UserModel extends Model {}

UserModel.init({}, {
	sequelize,
	modelName: 'User'
})

export { UserModel }