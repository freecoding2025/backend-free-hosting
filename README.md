# backend-free-hosting

This is a small Express example configured to use MySQL via Sequelize.

Quick notes:
- The database connections for development, test and production are configured in `config/config.json`.
- For local development and tests you can run a local MySQL server or provide credentials via environment variables (recommended for production secrets).

Available endpoints:
- GET /health
- GET /api/hello
- POST /api/echo
- POST /api/notes (body: { title, body })
- GET /api/notes

Run locally:

1. npm install
2. npm start

Run tests:

1. npm test
