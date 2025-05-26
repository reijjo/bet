# bet

## What is this?

Place where you can track your bets
- You can finally ditch the annoying Excel Sheets that are impossible to update with your phone.
<img alt="Screenshot 2025-04-20 at 20 52 33" src="https://github.com/user-attachments/assets/b6250091-7780-448f-a185-9ee59491a8aa" width="1412" height='480' />

## Tech stuff

### With what?

This project is done with `React`, `TypeScript`, `Expressjs` and `CSS`
- `RTK query` for queries
- `Redux` for state managment
- `PostgreSQL` and `Sequelize` for database
- `Sessions` for user managment

## How to use?

Try it live <a href='https://tarpit.pages.dev/'>here</a>
- Frontend is deployed with `Cloudfare pages`
- Database is deployed in `AWS RDS`
- Backend is deployed with `Render`

### Locally
Install `Docker` and `Bun`
#### Frontend
- Go to `bet/client` folder
- Rename `env` file to `.env`
- Run `bun install`
- Start frontend with `bun run dev` and go to http://localhost:5173/
#### Backend
- Go to `bet/server` folder
- Rename `.envEXAMPLE` file to `.env` and fill in the blanks
- Run `bun install`
- Start backend with `bun run dev`
- Backend is running at http://localhost:3000/
#### Database
Make sure you have `Docker` running
- Go to `bet/server` folder
- Start database with `docker compose up`
- `pgAdmin` is running at http://localhost:5050/



## Testing
- Frontend `vitest`
- Backend `bun:test`
- E2E `Playwright` (coming later...)

### Frontend
Go to frontend folder (client)
- `bun run test` to run unit tests
- `bun run test:cover` to run unit tests and see the test coverage

### Backend
Go to backend folder (server)
- `bun run test` to run unit tests
- `bun run test:cover` to run unit tests and see the test coverage

### End-to-end
coming...
