from typing import Generator
from app.postgres.session import SessionLocal


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
