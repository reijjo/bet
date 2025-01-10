import { ConnectionRefusedError, Sequelize } from "sequelize";
import { config } from '../config'
import { blueBright, redBright } from "colorette";

const { DATABASE_URL } = config

const sequelize = new Sequelize(DATABASE_URL, {
	retry: {
		max: 3,
		timeout: 3000
	},
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
	dialectOptions: {
    connectTimeout: 10000,
  },
	logging: false
});

export const connectToDB = async () => {
	try {
		await sequelize.authenticate()
		console.log(blueBright('Connected to database.'))
	} catch (error: unknown) {
		if (error instanceof ConnectionRefusedError) {
			console.error(redBright("Database connection refused!"));
			console.log(blueBright('Check that database is running.'))
		} else {
			console.error(redBright('Unexpected error during startup: '), error)
		}
		process.exit(1)
	}
}