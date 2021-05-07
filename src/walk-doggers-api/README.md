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


Run coverage tests for api:
```bash
# when running with docker-compose:
docker exec -it walk-doggers-api_server_1 bash -c "cd /app/app/tests && pytest --cov app --cov-report html"

# when running locally:
cd ./app/tests; pytest --cov app --cov-report html; cd -

# now you can open ./app/tests/htmlcov/index.html in browser
```