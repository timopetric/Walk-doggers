from typing import Any, Dict, Optional

from pydantic import BaseSettings, PostgresDsn, validator
import re
import os


class Settings(BaseSettings):
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str

    SQLALCHEMY_DATABASE_URI: Optional[PostgresDsn] = None

    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v

        # read heroku environment for db postgres link
        if os.environ.get("DATABASE_URL"):
            user, password, host, database = re.match(
                r"^postgres://(.*?):(.*?)@(.*?):.*?/(.*?)$",
                os.environ["DATABASE_URL"]
            ).groups()
            return PostgresDsn.build(
                scheme="postgresql",
                user=user,
                password=password,
                host=host,
                path=f"/{database or ''}",
            )

        return PostgresDsn.build(
            scheme="postgresql",
            user=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_SERVER"),
            path=f"/{values.get('POSTGRES_DB') or ''}",
        )

    class Config:
        case_sensitive = True

        # If you want.en to read environment variables from a v
        # file instead un-comment the below line and create the
        # .env file at the root of the project.

        # env_file = ".env"


settings = Settings()