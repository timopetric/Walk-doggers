from typing import Generator

from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette.status import HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_410_GONE, HTTP_403_FORBIDDEN

from app.postgres import actions
from app.postgres.session import SessionLocal
from app.postgres.models import Listing, Application


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


def check_if_user_can_apply_to_listing(user_id: str, listing: Listing):
    if listing is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")

    application: Application
    for application in listing.applications:
        # check if user already applied to listing
        if str(application.applied_user_id) == str(user_id):
            raise HTTPException(status_code=HTTP_409_CONFLICT, detail="User already applied.")
        # check if any of applied user is already confirmed
        if application.status == "confirmed":
            raise HTTPException(status_code=HTTP_410_GONE, detail="Applications not available anymore.")


def check_if_listing_is_active(listing: Listing):
    if listing is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")

    return listing.confirmed_application is None

    # application: Application
    # for application in listing.applications:
    #     if application.status in "confirmed":
    #         return False
    #
    # return True


def check_if_user_is_author_of_listing(user_id: str, listing: Listing):
    if listing is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Error")

    if str(listing.author_id) != user_id:
        raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail="Forbidden")
