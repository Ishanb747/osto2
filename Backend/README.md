# Golang Authentication Backend

This is a simple Golang backend for user authentication using PostgreSQL.

## Features
- User registration
- User login
- Password hashing
- PostgreSQL integration

## Tech Stack
- Gin (HTTP router)
- GORM (ORM for PostgreSQL)
- godotenv (environment config)
- bcrypt (password hashing)

## Setup
1. Copy `.env` and set your `DATABASE_URL` for PostgreSQL.
2. Run `go mod tidy` to install dependencies.
3. Start the server:
   ```powershell
   go run main.go
   ```

## API Endpoints
- `POST /register` — Register a new user
- `POST /login` — Login with username and password

## Example .env
```
DATABASE_URL=postgres://user:password@localhost:5432/osto_auth_db?sslmode=disable
```
