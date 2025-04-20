# bet

## What is this?

Place where you can track your bets
- You can finally ditch the annoying Excel Sheets that are impossible to update with your phone.
<img alt="Screenshot 2025-04-20 at 20 52 33" src="https://github.com/user-attachments/assets/b6250091-7780-448f-a185-9ee59491a8aa" width="1412" height='480' />

## Tech stuff

### With what?

This project is done with `React`, `TypeScript`, `Expressjs` and basic `CSS`
- `RTK query` for queries
- `Redux` for state managment
- `PostgreSQL` and `Sequelize` for database
- `Sessions` for user managment

## How to use?
Try it live <a href='https://blue-mud-099cac403.6.azurestaticapps.net/'>here</a>
- Frontend is deployed with `Azure Static Web App`
- Database is deployed in a Docker container with `Azure Virtual machine`
- Backend is deployed with `Render`


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
