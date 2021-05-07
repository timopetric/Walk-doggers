### Run docker

```bash
docker-compose up --build
```



### Database migrations

Run command after adding or updating models. A new migration script will be generated in `/alembic/versions` folder.
Migration script that modifies tables in postgresql database will be automatically executed next time you run `docker compose up`.

```bash
docker-compose run server alembic revision --autogenerate -m 'migration comment'
```



### Run coverage tests for api:

```bash
# when running with docker-compose:
docker exec -it -w /app/app/tests walk-doggers-api_server_1 pytest --cov app --cov-report html

# when running locally:
cd ./app/tests; pytest --cov app --cov-report html; cd -

# now you can open ./app/tests/htmlcov/index.html in browser
```



### Run cypress frontend tests:

Cypress tests are defined in 
`src/walk-doggers-api/app/tests/cypress_tests/cypress/integration/spec.js`
file.

1. in **walk-doggers-api** folder run `docker-compose up --build` to start **api server** and dev **databases**,
2. in **walk-doggers-app** folder. Run `npm install`. Then run `expo start:web` / or start dockerized expo web version for testing with the command in app README file
3. move to folder: LP234-21/src/walk-doggers-api/app/tests/cypress_tests and run:
4. `docker run --rm -v $PWD:/e2e -w /e2e --network=host cypress/included:7.2.0` to start the test.

The results will be visible in terminal (command from the 4th point above) and in the map (video and possibly screenshots).

