from typing import Generator

from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette.status import HTTP_404_NOT_FOUND

from app.postgres import actions
from app.postgres.session import SessionLocal


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


regex_password = r"^(?=.*[A-Z].*)(?=.*[!@#$&*])(?=.*[0-9].*)(?=.*[a-z].*[a-z].*[a-z]).{8,}$"
regex_email = r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[" \
              r"a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
ERROR_USER_NOT_FOUND = "User with id: {} not found in the database"


def get_user_from_id(db: Session, user_id: str):
    """get an user object from db session and return it"""
    user = actions.user.get(db=db, id=user_id)
    if user is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail=ERROR_USER_NOT_FOUND.format(user_id))
    return user
