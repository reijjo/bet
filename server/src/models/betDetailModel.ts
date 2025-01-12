import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db/db";
import { BetType } from "../utils/enums";
import { BetModel } from "./betModel";

class BetDetailsModel extends Model {}

BetDetailsModel.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	bet_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: BetModel,
			key: 'id'
		},
		onDelete: 'CASCADE'
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false
	},
	home_team: {
		type: DataTypes.STRING,
	},
	away_team: {
		type: DataTypes.STRING,
	},
	selection: {
		type: DataTypes.STRING,
		allowNull: false
	},
	odds: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false
	},
	home_result: {
		type: DataTypes.STRING,
	},
	away_result: {
		type: DataTypes.STRING,
	},
	betbuilder_selection: {
		type: DataTypes.ARRAY(DataTypes.STRING),
	},
	betbuilder_result: {
		type: DataTypes.ARRAY(DataTypes.STRING),
	},
	freebet: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false
	},
	livebet: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false
	},
	bet_type: {
		type: DataTypes.ENUM(...Object.values(BetType)),
		allowNull: false
	}
}, {
	sequelize,
	underscored: true,
	timestamps: true,
	modelName: 'BetDetails'
})

export { BetDetailsModel }