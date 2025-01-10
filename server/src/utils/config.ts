const envVars = [
	"PORT",
  "DB_NAME",
  "DB_PORT",
  "DB_HOST",
	"DB_MAINTENANCE",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
	"PGADMIN_DEFAULT_EMAIL",
	"PGADMIN_DEFAULT_PASSWORD",
	"PG_PORT"
] as const;

// Validates that env variables exists
for (const varName of envVars) {
	if (!Bun.env[varName]) {
		throw new Error(`Missing env variable: ${varName}`)
	}
}

const { PORT, DB_NAME, DB_PORT, DB_HOST, DB_MAINTENANCE, POSTGRES_USER, POSTGRES_PASSWORD, PGADMIN_DEFAULT_EMAIL, PGADMIN_DEFAULT_PASSWORD, PG_PORT } = Bun.env
const DATABASE_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`


export const config = {
	PORT,
	DB_NAME,
	DB_PORT,
	DB_HOST,
	DB_MAINTENANCE,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	PGADMIN_DEFAULT_EMAIL,
	PGADMIN_DEFAULT_PASSWORD,
	PG_PORT,
	DATABASE_URL
}