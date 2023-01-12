# Storefront Backend Project

## Getting Started

- We have two databases in the app one for the development environment named "shopping" and the other for the testing environment named "full_stack_test".

- commands (PSQL):
- CREATE USER shopping_user WITH PASSWORD 'password123';

- CREATE DATABASE shopping;
- CREATE DATABASE full_stack_test;

- GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
- GRANT ALL PRIVILEGES ON DATABASE full_stack_test TO shopping_user;

- environment variables:
- - POSTGRES_HOST=127.0.0.1
- - POSTGRES_DB=shopping
- - POSTGRES_DB_TEST=full_stack_test
- - POSTGRES_USER=shopping_user
- - POSTGRES_PASSWORD=password123
- - BCRYPT_PASSWORD= your-secret-password
- - SALT_ROUND=10
- - TOKEN_SECRET=thats-our-secret
- - NODE_ENV=dev

- backend port: 8080;
- database port 5432;

- Migrate tables up by "dm-migrate up"

- Just run the application by "npm run dev"

- For testing run "npm run test"

## Notes

- Instead of "handlers" folder I used "routes" folder to organise the routes and "controllers" folder to organise the methods for the routes and send responses.

- We have a join table in our database schema so I created a "service" folder to handle its queries.
