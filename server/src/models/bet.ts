import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db/db";
import { BetStatus, BetType, Bookmaker, SportLeague } from "../utils/enums";

class BetModel extends Model {}

BetModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
			// references: {
			// 	model: 'UserModel',
			// 	key: 'id'
			// },
			// onDelete: 'CASCADE'
		},
		stake: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		bookmaker: {
			type: DataTypes.ENUM(...Object.values(Bookmaker)),
			allowNull: false
		},
		tipper: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.ENUM(...Object.values(BetStatus)),
			allowNull: false
		},
		bet_final_type: {
			type: DataTypes.ENUM(...Object.values(BetType)),
			allowNull: false
		},
		sport: {
			type: DataTypes.ENUM(...Object.values(SportLeague)),
			allowNull: false
		},
		notes: {
			type: DataTypes.STRING
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: true,
		modelName: 'Bet',
	}
)

export { BetModel }