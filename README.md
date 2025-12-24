## Project name blog-api with  a REST API with Express, PostgreSQL, TypeOrm, and TypeScript
-------------------------------------------------------------------------------------------
 ## Install dependencies:
```bash
npm install express typeorm pg bcrypt
npm install -D typescript nodemon
```
## This is TypeScript settings:
```bash
"dev": "tsc -w & nodemon dist/server.js"
```

## In order to run the project:
```bash
npm run dev
```
## Used Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- TypeORM
- Zod (validation)
- bcrypt (password hashing)
- Luxon (date/time)

## Environment Variables

This project uses environment variables for configuration.
Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env

PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=blog_db


