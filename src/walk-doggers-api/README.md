### Run docker

```bash
docker-compose up # --build
```

### Database migrations

Run command after adding or updating models. A new migration script will be generated in `/alembic/versions` folder.
Migration script that modifies tables in postgresql database will be automatically executed next time you run `docker compose up`.

```bash
docker-compose run server alembic revision --autogenerate -m 'migration comment'
```